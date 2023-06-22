from django.shortcuts import render
# from django.contrib.auth.models import User
from main.models import Persona, History, UserProfile
from django.http import JsonResponse, HttpResponse
import openai
from decouple import config
import json, random
import pickle
import sys
from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from rest_framework import status
import requests
from django.http import JsonResponse, Http404
# Retrieve Enviornment Variables
openai.organization = config("OPEN_AI_ORG")
openai.api_key = config("OPEN_AI_KEY")
ELEVEN_LABS_API_KEY = config("ELEVEN_LABS_API_KEY")

# Setting Persona
# 필요 없는듯? 삭제 고려
# def set_persona(selected_persona, txt):    
#     try:
#         response = openai.ChatCompletion.create(
#             model="gpt-3.5-turbo",
#             messages=[{"role": "user", "content": txt}]
#         )
#         message_text = response["choices"][0]["message"]['content']
#         print(message_text)
#         return message_text
#     except Exception as e:
#         return print(e)

# 해결 완료
@api_view(['GET'])
def start_roleplay(request, persona_id):
    try:
        persona = Persona.objects.filter(id=persona_id).first()
        if persona:
            persona_name = persona.persona_name
            age = persona.age
            gender = persona.gender
            position = persona.position
            department = persona.department
            state = persona.state
            
            txt = f"""이제부터 상담 역할극을 할건데, 나는 상담하는 사람, 너는 상담 당하는 사람으로, {persona_name}라는 이름의 {age}살 {gender}로 
            {department}의 {position}이고 {state}를 원하는 역할을 해줘""".replace("\n", '').replace("    ", "")
            
            response = openai.ChatCompletion.create(
            model="gpt-3.5-turbo",
            messages=[{"role": "user", "content": txt}]
        )
        message_text = response["choices"][0]["message"]['content']
        print(message_text)
        return Response(message_text, status=status.HTTP_200_OK)
    except Exception as e:
            return JsonResponse({'error': 'Persona not found'})

# 해결
# Open AI - Whisper
# Convert audio to text
@api_view(['POST'])
def convert_audio_to_text(request, audio_file='broadcast_00033001.wav'):
    try:
        with open(audio_file, 'rb') as audio_file:
            transcript = openai.Audio.transcribe("whisper-1", audio_file)
        print(transcript)
        message_text = transcript["text"]
        return Response(message_text, status=status.HTTP_200_OK)
    except Exception as e:
    	return Response(str(e), status=status.HTTP_500_INTERNAL_SERVER_ERROR)


def get_recent_messages():
  # Define the file name
  # 실험 위해 output.json 이용
#   file_name = "stored_data.json"
  file_name = "output.json"
  learn_instruction = {"role": "system", 
                       "content": "You are a English teacher, the user is Park Chan. Keep responses under 40 words. "}
  
  # Initialize messages
  messages = []

  # Add Random Element
  x = random.uniform(0, 1)
  if x < 0.2:
    learn_instruction["content"] = learn_instruction["content"] + "Your response will have some light humour. "
  elif x < 0.5:
    learn_instruction["content"] = learn_instruction["content"] + "Your response will include an interesting new fact about English. "
  else:
    learn_instruction["content"] = learn_instruction["content"] + "Your response will recommend another word to learn. "

  # Append instruction to message
  messages.append(learn_instruction)

  # Get last messages
  try:
    with open(file_name) as user_file:
      data = json.load(user_file)
      
      # Append last 5 rows of data
      if data:
        if len(data) < 5:
          for item in data:
            messages.append(item)
        else:
          for item in data[-5:]:
            messages.append(item)
  except:
    pass  
  # Return messages
  return messages

# Open AI - Chat GPT
# 해결됨
@api_view(["POST"])
def get_chat_response(request, message_input):

  messages = get_recent_messages()
  user_message = {"role": "user", "content": message_input + " Only say two or 3 words in Spanish if speaking in Spanish. The remaining words should be in English"}
  messages.append(user_message)
  print(messages)

  try:
    response = openai.ChatCompletion.create(
      model="gpt-3.5-turbo",
      messages=messages
    )
    message_text = response["choices"][0]["message"]["content"]
    return Response(message_text, status=status.HTTP_200_OK)
  except Exception as e:
    return Response(str(e), status=status.HTTP_500_INTERNAL_SERVER_ERROR)

#해결됨
@api_view(['POST'])
def make_report(request, filename='output.json'):
    # stored_data.json
	with open(filename, 'r', encoding='utf-8') as f:
		json_data = json.load(f) 
	print(json_data)
	# print('='*100)
	# with open('stored_data.json', encoding='utf-8') as f:
	# 	json_data = json.load(f)
	# json_data = json_data[1:]
 	# print(json_data[1:])
	try:
		response = openai.ChatCompletion.create(
			model="gpt-3.5-turbo",
			messages=[{"role": "user", "content": f' "{json_data}" 다음의 상담내용을 user입장에서 개요, 잘한 점, 보완할 점의 3항목으로 json 형태의 보고서로 작성해줘 '}]
   		)
		message_text = response["choices"][0]["message"]['content']
		print(message_text)
		return Response(message_text, status=status.HTTP_200_OK)
	except Exception as e:
		return Response(str(e), status=status.HTTP_500_INTERNAL_SERVER_ERROR)

@api_view(['POST'])
def continue_text(reqeust, chat_log = None, persona_id = None, question = None):
    if not chat_log:
        with open('output.json', 'r', encoding='utf-8') as f:
            txt = json.load(f)
    if not question:
        question = '오늘 기분은 어떻세요?'
    txt = json.dumps(txt, ensure_ascii=False, indent = 4)
    try:
        persona = Persona.objects.filter(id=persona_id).first()
        if persona:
            persona_name = persona.persona_name
            age = persona.age
            gender = persona.gender
            position = persona.position
            department = persona.department
            state = persona.state
            txt = f"""이제부터 상담 역할극을 할건데, 나는 상담하는 사람, 너는 상담 당하는 사람으로, {persona_name}라는 이름의 {age}살 {gender}로 
			{department}의 {position}이고 {state}를 원하는 역할을 해줘.  {txt}""".replace("\n", '').replace("    ", "")
   		# print(txt)
    except Exception as e:
        return JsonResponse({'error': 'Persona not found'})
    try:
        response = openai.ChatCompletion.create(
            model="gpt-3.5-turbo",
			messages=[{"role": "user", "content": f"{txt} 위의 대화에 이어서 나는 user고 너는 assistant역할로 상담역할극을 다시 시작하자. 내 질문 : {question}"}])
        message_text = response["choices"][0]["message"]['content']
        print(message_text)
        return Response(message_text, status=status.HTTP_200_OK)
    except Exception as e:
        return Response(str(e), status=status.HTTP_500_INTERNAL_SERVER_ERROR)



# 해결필요
@api_view(['GET', 'POST'])  # GET, POST 메서드 허용
def convert_text_to_speech(request, message):
    if request.method == 'POST':
        body = {
            "text": message,
            "model_id": "eleven_monolingual_v1",
            "voice_settings": {
                "stability": 0.5,
                "similarity_boost": 0.5
            }
        }

        voice_Domi = "AZnzlk1XvdvUeBnXmlld"
        voice_rachel = "21m00Tcm4TlvDq8ikWAM"
        voice_antoni = "ErXwobaYiN019PkySvjV"
        voices = [voice_Domi, voice_rachel, voice_antoni]
        headers = {"xi-api-key": ELEVEN_LABS_API_KEY, "Content-Type": "application/json", "accept": "audio/mpeg"}
        endpoint = f"https://api.elevenlabs.io/v1/text-to-speech/{random.choice(voices)}"
        try:
            response = requests.post(endpoint, json=body, headers=headers)
        except Exception as e:
            return HttpResponse(str(e), status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        if response.status_code == 200:
            return HttpResponse(response.content, content_type='audio/mpeg')
        else:
            return HttpResponse(status=response.status_code)
    elif request.method == 'GET':
        # GET 요청에 대한 처리 로직을 구현합니다.
        return HttpResponse("GET 요청을 처리합니다.")

# Save messages for retrieval later on
def store_messages(request_message, response_message):

  # Define the file name
  file_name = "stored_data.json"

  # Get recent messages
  messages = get_recent_messages()[1:]

  # Add messages to data
  user_message = {"role": "user", "content": request_message}
  assistant_message = {"role": "assistant", "content": response_message}
  messages.append(user_message)
  messages.append(assistant_message)

  # Save the updated file
  with open(file_name, "w") as f:
    json.dump(messages, f)


# Save messages for retrieval later on
def reset_messages():

  # Define the file name
  file_name = "stored_data.json"

  # Write an empty file
  open(file_name, "w")

"--------------------------------------------------------------------------------------------------------------------------------------------------------------"
