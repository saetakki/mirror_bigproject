# uvicorn main:app
# uvicorn main:app --reload

# Main imports
from fastapi import FastAPI, File, UploadFile, HTTPException, UploadFile
from fastapi.responses import StreamingResponse
from fastapi.middleware.cors import CORSMiddleware
from decouple import config
import openai, json


# Custom function imports
from functions.text_to_speech import convert_text_to_speech
from functions.openai_requests import convert_audio_to_text, get_chat_response, make_report, set_persona, continue_text
from functions.database import store_messages, reset_messages

from fastapi import Depends, FastAPI, HTTPException
from sqlalchemy.orm import Session

from sql_app import crud, models, schemas
from sql_app.database import SessionLocal, engine

models.Base.metadata.create_all(bind=engine)

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
    json_report = json.loads(report)
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


#### DB
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


@app.post("/users/", response_model=schemas.User)
async def create_user(user: schemas.UserCreate, db: Session = Depends(get_db)):
    db_user = crud.get_user_by_email(db, email=user.email)
    if db_user:
        raise HTTPException(status_code=400, detail="Email already registered")
    return crud.create_user(db=db, user=user)


@app.get("/users/", response_model=list[schemas.User])
async def read_users(skip: int = 0, limit: int = 100, db: Session = Depends(get_db)):
    users = crud.get_users(db, skip=skip, limit=limit)
    return users


@app.get("/users/{user_id}", response_model=schemas.User)
async def read_user(user_id: int, db: Session = Depends(get_db)):
    db_user = crud.get_user(db, user_id=user_id)
    if db_user is None:
        raise HTTPException(status_code=404, detail="User not found")
    return db_user

@app.post("/users/{user_id}/upload-image/")
async def upload_image(user_id:int, file: UploadFile = File(...), db: Session = Depends(get_db)):
    contents = await file.read()
    db_user = crud.get_user(db, user_id)
    if db_user is None:
        raise HTTPException(status_code=404, detail="User not found")
    db_user.file = contents
    db.commit()
    db.refresh(db_user)
    return {"message": "Image uploaded successfully"}

@app.patch("/users/{user_id}", response_model = schemas.User)
async def update_user(user_id: int, user_update: schemas.UserUpdate, file: UploadFile = File(...), db: Session = Depends(get_db)):
	db_user = crud.get_user(db, user_id)
	if db_user is None:
		raise HTTPException(status_code=404, detail="User not found")
	if file is not None:
		file_data = await file.read()
		user_update.file = file_data
	updated_user = crud.update_user(db, user_id, user_update)
	return updated_user

@app.delete("/users/{user_id}", response_model = schemas.User)
async def delete_user(user_id:int, db: Session = Depends(get_db)):
    db_user = crud.get_user(db, user_id)
    if db_user is None:
        raise HTTPException(status_code=404, detail="User not found")
    deleted_user = crud.delete_user(db, user_id)
    return deleted_user
    

@app.post("/users/{user_id}/items/", response_model=schemas.Persona)
async def create_Persona_for_user(user_id: int, item: schemas.PersonaCreate, db: Session = Depends(get_db)):
    return crud.create_Persona_item(db=db, item=item, user_id=user_id)


@app.get("/personas/", response_model=list[schemas.Persona])
async def read_items(skip: int = 0, limit: int = 100, db: Session = Depends(get_db)):
    items = crud.get_Personas(db, skip=skip, limit=limit)
    return items

@app.get("/personas/{user_id}", response_model=schemas.Persona)
async def read_item(user_id : int, db : Session = Depends(get_db)):
	item = crud.get_Persona(db, user_id=user_id)
	if item is None:
		raise HTTPException(status_code=404, detail='Persona not found')
	return item

@app.patch("/pernonas/{user_id}", response_model = schemas.Persona)
async def update_Persona(user_id: int, user_update: schemas.PersonaUpdate, db: Session = Depends(get_db)):
	db_Persona = crud.get_Persona(db, user_id)
	if db_Persona is None:
		raise HTTPException(status_code=404, detail="User not found")
	updated_Persona = crud.update_Persona(db, user_id, user_update)
	return updated_Persona

@app.delete("/pernonas/{user_id}", response_model = schemas.Persona)
async def delete_Persona(user_id:int, db: Session = Depends(get_db)):
    db_Persona = crud.get_Persona(db, user_id)
    if db_Persona is None:
        raise HTTPException(status_code=404, detail="User not found")
    deleted_Persona = crud.delete_Persona(db, user_id)
    return deleted_Persona

@app.get('/personas/{user_id}/{order_num}', response_model = str)
async def setting_persona(user_id : int, order_num : int, db : Session = Depends(get_db)):
    items = crud.get_Personas_by_id(db, user_id = user_id)
    if items is None:
        raise HTTPException(status_code=404, detail='Persona not found')
    try:
        selected_persona = items[order_num]
        txt = set_persona(selected_persona)
        return txt
    except IndexError:
    	raise HTTPException(status_code=400, detail='해당 순번의 페르소나가 없습니다. 다시 확인해주세요')
 
@app.post('/history_id/{history_id}', response_model = str)
async def continue_converstation(chat_log=None, question=None):
    txt = continue_text(chat_log=None, question=None)
    print(txt)
    return txt