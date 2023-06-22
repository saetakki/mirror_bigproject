from django.shortcuts import render
from django.contrib.auth.models import User
from main.models import Persona, History, UserProfile
from django.http import JsonResponse, HttpResponse
import openai
from decouple import config
import json, random
import pickle
import sys
from main.serializers import HistorySerializer, ChatLogReportSerializer, UserProfileSerializer
from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from rest_framework import status
import requests
from django.http import JsonResponse, Http404
from rest_framework.permissions import IsAuthenticated
# Retrieve Enviornment Variables
openai.organization = config("OPEN_AI_ORG")
openai.api_key = config("OPEN_AI_KEY")
ELEVEN_LABS_API_KEY = config("ELEVEN_LABS_API_KEY")

# Setting Persona
# 필요 없는듯? 삭제 고려
@api_view(['POST'])
@permission_classes([IsAuthenticated])
def set_persona(request, history_id):
    try:
        history = History.objects.get(id=history_id, user=request.user)
    except History.DoesNotExist:
        raise Http404('History does not exist')
    selected_persona = request.data.get('selected_persona')
    persona_name = selected_persona['persona_name']
    age = selected_persona['age']
    gender = selected_persona['gender']
    position = selected_persona['position']
    department = selected_persona['department']
    state = selected_persona['state']
    
    persona = Persona(
        persona_name=persona_name,
        age=age,
        gender=gender,
        position=position,
        department=department,
        state=state
    )
    persona.save()
    return JsonResponse({}, status=200)
    


def start_roleplay(history_id):
    try:
        history = History.objects.get(id=history_id)
        if history.persona:
            persona_name = history.persona.persona_name
            age = history.persona.age
            gender = history.persona.gender
            position = history.persona.position
            department = history.persona.department
            state = history.persona.state
            
            txt = f"""이제부터 상담 역할극을 할건데, 나는 상담하는 사람, 너는 상담 당하는 사람으로, {persona_name}라는 이름의 {age}살 {gender}로 
            {department}의 {position}이고 {state}를 원하는 역할을 해줘""".replace("\n", '').replace("    ", "")
            print(txt)
            response = openai.ChatCompletion.create(
            model="gpt-3.5-turbo",
            messages=[{"role": "user", "content": txt}]
        )
        message_text = response["choices"][0]["message"]['content']
        print(message_text)
        
        return message_text
    except Exception as e:
            return e

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


def get_recent_messages(history_id):
  # Define the file name
  # 실험 위해 output.json 이용
#   file_name = "stored_data.json"
  file_name = "output.json"
  txt = start_roleplay(history_id)
  history = History.objects.get(id=history_id)
  learn_instruction = {"role": "system", 
                       "content": f"{txt}. user는 {history.user.userprofile.real_name}. Keep responses under 40 words. "}
  
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
def get_chat_response(request, history_id, message_input):

  messages = get_recent_messages(history_id)
  user_message = {"role": "user", "content": message_input }
  messages.append(user_message)
  print(messages)

  try:
    response = openai.ChatCompletion.create(
      model="gpt-3.5-turbo",
      messages=messages
    )
    message_text = response["choices"][0]["message"]["content"]
    return JsonResponse({'message': json.dumps(message_text, ensure_ascii=False)}, status=status.HTTP_200_OK)
  except Exception as e:
    return Response(str(e), status=status.HTTP_500_INTERNAL_SERVER_ERROR)

#해결됨

@permission_classes([IsAuthenticated])
@api_view(['POST'])
def make_report(request, history_id, filename='output.json'):
    try:
        history = History.objects.get(id=history_id, user=request.user)
    except History.DoesNotExist:
        raise Http404('History does not exist')
    # stored_data.json
    # chat log 받아오기
    # chat_log = history.chat_log
    # if chat_log is None:
    #     raise Http404('대화 기록이 없습니다')
    # if history.chat_log is None:
    #     raise Http404('대화 기록이 없습니다')
    
    # if history.report:
    #     raise Http404( "이미 보고서가 존재합니다")
    
    # chat log 받아오기
    # json_data = history.chat_log
	
	# 제대로 된 chat_log있으면 이거 지우기
    with open(filename, 'r', encoding='utf-8') as f:
        chat_log = json.load(f) 
    print(chat_log)
    try:
        response = openai.ChatCompletion.create(
			model="gpt-3.5-turbo",
			messages=[{"role": "user", "content": f' "{chat_log}" 다음의 상담내용을 user입장에서 개요, 잘한 점, 보완할 점의 3항목으로 json 형태의 보고서로 작성해줘 '}])
        message_text = response["choices"][0]["message"]['content']      
        print(message_text)
        history.report = message_text
        history.save()
        serializer = ChatLogReportSerializer(history)
        return JsonResponse({"report" : serializer.data.get('report')}, status=status.HTTP_200_OK, safe=False)
    except Exception as e:
        return Response(str(e), status=status.HTTP_500_INTERNAL_SERVER_ERROR)

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def continue_text(request, history_id, question = None):
    try:
        history = History.objects.get(id=history_id, user=request.user)
    except History.DoesNotExist:
        raise Http404('History does not exist')
    
    #question = request.data.get("question")
    
    # if history.chat_log is None:
    #     raise Http404('History does not exist')
    with open('output.json', 'r', encoding='utf-8') as f:
        txt = json.load(f)
    if not question:
        question = '오늘 기분은 어떻세요?'
    txt = json.dumps(txt, ensure_ascii=False, indent = 4)
    try:
        persona = history.persona
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

def store_messages_to_db(history_id):
    file_name = 'stored_data.json'
    with open(file_name, 'r') as f:
        chat_log = json.load(f)
    try:
        history = History.objects.get(id=history_id)
    except History.DoesNotExist:
        raise Http404('History does not exist')
    history.chat_log = chat_log
    return JsonResponse({'message' : '저장 완료'}, status=200)

# Save messages for retrieval later on
def reset_messages():	

  # Define the file name
  file_name = "stored_data.json"

  # Write an empty file
  open(file_name, "w")

"--------------------------------------------------------------------------------------------------------------------------------------------------------------"
