# uvicorn main:app
# uvicorn main:app --reload

# Main imports
from fastapi import FastAPI, File, UploadFile, HTTPException
from fastapi.responses import StreamingResponse
from fastapi.middleware.cors import CORSMiddleware
from decouple import config
import openai, json


# Custom function imports
from functions.text_to_speech import convert_text_to_speech
from functions.openai_requests import convert_audio_to_text, get_chat_response, make_report
from functions.database import store_messages, reset_messages


# Get Environment Vars
openai.organization = config("OPEN_AI_ORG")
openai.api_key = config("OPEN_AI_KEY")


# Initiate App
app = FastAPI()


# CORS - Origins
origins = [
    "http://localhost:5173",
    "http://localhost:5174",
    "http://localhost:4173",
    "http://localhost:3000",
]


# CORS - Middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


# Check health
@app.get("/health")
async def check_health():
    return {"response": "healthy"}


# Reset Conversation
@app.get("/reset")
async def reset_conversation():
    reset_messages()
    return {"response": "conversation reset"}


@app.post("/get-recorded-text")
async def get_recorded_text(file: UploadFile = File(...)):
    with open(file.filename, "wb") as buffer:
        buffer.write(file.file.read())
    
    audio_input = open(file.filename, "rb")    
    # Decode audio
    message_decoded = convert_audio_to_text(audio_input)
    
    chat_response = get_chat_response(message_decoded)  
    
    if not chat_response:
        print("Failed chat response")
        raise HTTPException(status_code=400, detail="Failed chat response")
    return {"recorded_q": message_decoded, 'recorded_a' : chat_response}

@app.post('/make-report')
async def get_report():
    report = make_report()
    json_report = json.dumps(report.split('\n\n'), ensure_ascii=False)
    return json_report

# Post bot response
# Note: Not playing back in browser when using post request.
@app.post("/post-audio/")
async def post_audio(file: UploadFile = File(...)):

    # Convert audio to text - production
    # Save the file temporarily
    with open(file.filename, "wb") as buffer:
        buffer.write(file.file.read())
    
    audio_input = open(file.filename, "rb")    

    # Decode audio
    message_decoded = convert_audio_to_text(audio_input)
    

    # Guard: Ensure output
    if not message_decoded:
        print("Failed to decode audio")
        raise HTTPException(status_code=400, detail="Failed to decode audio")

    # Get chat response
    chat_response = get_chat_response(message_decoded)

    # Store messages
    store_messages(message_decoded, chat_response)

    # Guard: Ensure output
    if not chat_response:
        print("Failed chat response")
        raise HTTPException(status_code=400, detail="Failed chat response")

    # Convert chat response to audio
    audio_output = convert_text_to_speech(chat_response)

    # Guard: Ensure output
    if not audio_output:
        print("Failed audio output")
        raise HTTPException(status_code=400, detail="Failed audio output")

    # Create a generator that yields chunks of data
    def iterfile():
        yield audio_output

    # Use for Post: Return output audio
    return StreamingResponse(iterfile(), media_type="application/octet-stream")
