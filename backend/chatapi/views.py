from django.shortcuts import render
from django.contrib.auth.models import User
from main.models import Persona, History, UserProfile
from django.http import JsonResponse, HttpResponse
import openai
from decouple import config
import json, random
import os
import pickle
import sys
import tempfile
from main.serializers import HistorySerializer, ChatLogReportSerializer, UserProfileSerializer
from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from rest_framework import status
import requests
from django.http import JsonResponse, Http404
from rest_framework.permissions import IsAuthenticated
from django.http import FileResponse
from .emotion import load_model_and_analyze_sentiment

# Retrieve Enviornment Variables
openai.organization = config("OPEN_AI_ORG")
openai.api_key = config("OPEN_AI_KEY")

import sys
import urllib.request


# 1. 페르소나 세팅과 저장
@api_view(['POST'])
@permission_classes([IsAuthenticated])
def set_persona(request):
	# 프론트로부터 데이터 가져오기
    persona_name = request.data.get('persona_name')
    age = request.data.get('age')
    gender = request.data.get('gender')
    position = request.data.get('position')
    department = request.data.get('department')
    state = request.data.get('state')    
    # 페르소나 테이블에 설정 저장
    persona = Persona(
        persona_name=persona_name,
        age=age,
        gender=gender,
        position=position,
        department=department,
        state=state
    )
    persona.save()

    # 프롬프터 엔지니어링    
    txt = f"""이제부터 상담 역할극을 할건데, 나는 상담하는 사람, 너는 상담 당하는 사람으로, {persona_name}라는 이름의 {age}살 {gender}로 
    {department}의 {position}이고 {state}를 원하는 역할을 해줘""".replace("\n", '').replace("    ", "")
    learn_instruction = {"role": "system", "content": f"{txt}. user는 {request.user.userprofile.real_name}. Keep responses under 40 words. 코칭역할을 잘 할 수 있도록 프롬프트 엔지니어링을 해야해"}
    
    # 히스토리 생성
    history = History(
        user=request.user,
        persona=persona,
        chat_log = [learn_instruction]
    )
    history.save()
    return JsonResponse({'history_id': history.id, 'text': '페르소나 설정 완료되었습니다'}, status=200)

def step(message_text):
    r = openai.ChatCompletion.create(
            model="gpt-3.5-turbo",
            messages = [
                {"role" : "user", "content" : f"{message_text} 위 질문이 GROW 코칭 모델에서 어떤 단계인지 알려줘, json 형식으로 부탁해 key값은 'step', value 값은 'G', 'R', 'O', 'W' 중 하나" }
            ]
            )

    return json.loads(r["choices"][0]["message"]["content"]).values()

# audio -> text 변환 함수
# 	ex) Content-Type : audio/mp3 or audio/wav)
# audio 입력받아 tts한후 db저장
@api_view(['POST'])
@permission_classes([IsAuthenticated])
def audio_to_text(request, history_id):
    # audio 파일 받기
    audio_file = request.FILES.get('audio_file')
    if not audio_file:
        return Response("No audio file provided.", status=status.HTTP_400_BAD_REQUEST)    
    try:        
        # TTS
        transcript = openai.Audio.transcribe("whisper-1", audio_file)                
        message_text = transcript["text"]
        print(message_text)
        
        # 히스토리 테이블에 저장
        history = History.objects.get(id=history_id, user=request.user)
        history.chat_log.append({"role": "user", "content": message_text})
        history.save()        
        # 프론트에게 결과 전달
        
        
        r = step(message_text)        
        
        return JsonResponse({'text' : message_text, "step" : list(r)[0]} , status=200)
    except Exception as e:
        return Response(str(e), status=status.HTTP_500_INTERNAL_SERVER_ERROR)
    
# text -> db저장
# 프론트에서 'text'로 전달받음
@api_view(['POST'])
@permission_classes([IsAuthenticated])
def get_text(request, history_id):
    message_text = request.data.get('text')
    if not message_text:
        return Response("No text provided", status=status.HTTP_400_BAD_REQUEST)
    history = History.objects.get(id=history_id, user = request.user)
    history.chat_log.append({"role" : "user", "content" : message_text})
    history.save()
    # 프론트에게 성공 전달
    try:
        r = step(message_text)
        return JsonResponse({"step" : list(r)[0]}, status = 200)
    except Exception as e:
        return JsonResponse({'msg' : "001"}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

# # history.chat_log에서 대화를 뽑아 chatgpt에게 전달하여 반응을 받아오는 함수
# @api_view(["POST"])
# @permission_classes([IsAuthenticated])
# def get_ChatGPT_response(request, history_id):
#     history = History.objects.get(id=history_id, user= request.user)
#     messages = history.chat_log    
#     try:
#         response = openai.ChatCompletion.create(
#             model="gpt-3.5-turbo",
#             messages=messages
#             )
        
#         message_text = response["choices"][0]["message"]["content"]
#         history.chat_log.append({'role':'assistant', 'content':message_text})
#         history.save()
        
        
        
#         emotion = load_model_and_analyze_sentiment(message_text)
        
#         return JsonResponse({'text': json.dumps(message_text, ensure_ascii=False),  'emotion': emotion}, status=status.HTTP_200_OK)
#     except Exception as e:
#         return JsonResponse({'msg' : "001"}, status=status.HTTP_500_INTERNAL_SERVER_ERROR) 


from django.http import StreamingHttpResponse
from django.core import serializers
from django.core.files.base import ContentFile
from django.core.files.storage import default_storage
import io
@api_view(['POST'])
@permission_classes([IsAuthenticated])
def get_ChatGPT_response(request, history_id):
    history = History.objects.get(id=history_id, user=request.user)
    
    messages = history.chat_log    
    try:
        # GPT 답변 생성
        response = openai.ChatCompletion.create(
            model="gpt-3.5-turbo",
            messages=messages
            )        
        message_text = response["choices"][0]["message"]["content"]
        history.chat_log.append({'role':'assistant', 'content':message_text})
        history.save()        
        emotion = load_model_and_analyze_sentiment(message_text)
        print('GPT 답변 \n', message_text)
    except:
        return JsonResponse({'msg' : "001"}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
    
    CHUNK_SIZE = 1024
    male_voices = ['jinho', 'nsinu', 'njinho', 'njihun', 'njooahn', 'nseonghoon', 'njihwan', 
                   'nsiyoon','ntaejin','nyoungil','nseungpyo','nwontak', 'njonghyun', 'njoonyoung', 'njaewook',
                   'nes_c_kihyo' ]
    female_voices = ['nara', 'nminyoung', 'nyejin', 'mijin', 'njiyun', 'nsujin', 'neunyoung', 
                     'nsunkyung','nyujin', 'nsunhee', 'nminseo', 'njiwon', 'nbora', 'nes_c_hyeri',
                     'nes_c_sohyun', 'nes_c_mikyung','ntiffany' ]
    session_voice_id = request.session.get(f'voice_id_{history_id}')
    
    if session_voice_id is None:
        if '남' in history.persona.gender:
            voice_id = random.choice(male_voices)
        else:
            voice_id = random.choice(female_voices)
        
        request.session[f'voice_id_{history_id}'] = voice_id
    else:
        voice_id = session_voice_id
    
    client_id = "yzkv8tab9o"
    client_secret = "5l0ouX7wFQIBDA6zLpGyGuyYZjc9KLNToQsX0aR4"
    speaker = voice_id
    text = history.chat_log[-1]['content']
    data = {
        "speaker": speaker,
        "volume": 0,
        "speed": 0,
        "pitch": 0,
        "format": "mp3",
        "text": text
    }
    url = "https://naveropenapi.apigw.ntruss.com/tts-premium/v1/tts"
    headers = {
        "Content-Type": "application/x-www-form-urlencoded",
        "X-NCP-APIGW-API-KEY-ID": client_id,
        "X-NCP-APIGW-API-KEY": client_secret
    }
    response = requests.post(url, headers=headers, data=data, stream=True)

    try:
        response.raise_for_status()
        buffer = io.BytesIO()
        for chunk in response.iter_content(chunk_size=CHUNK_SIZE):
            buffer.write(chunk)
        
        # 오디오 데이터를 ContentFile로 변환
        audio_content = ContentFile(buffer.getvalue())

        # Blob URL 생성 및 저장
        audio_path = default_storage.save('audio.mp3', audio_content)
        blob_url = default_storage.url(audio_path)

        return JsonResponse({'text': json.dumps(message_text, ensure_ascii=False),  'emotion': emotion, 'blob_url': blob_url},  status=status.HTTP_200_OK)
        # return StreamingHttpResponse(response.iter_content(chunk_size=CHUNK_SIZE), content_type='audio/mp3')
        
    except requests.HTTPError as e:
        return JsonResponse({'msg': '002'}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
    

from glob import glob
@api_view(['POST'])
@permission_classes([IsAuthenticated])
def make_report(request, history_id):
    try:
        history = History.objects.get(id=history_id, user=request.user)
    except History.DoesNotExist:
        raise Http404('History does not exist')
    chat_log = history.chat_log
    audio_list = glob('media/*.mp3')
    [os.remove(file_path) for file_path in audio_list]
    try:
        response = openai.ChatCompletion.create(
			model="gpt-3.5-turbo",
			messages=[{"role": "user", "content": f' "{chat_log}" 다음의 상담내용을 user입장에서 Overview, what went well, what could be improved의 3항목으로 json 형태의 보고서로 작성해줘 '}])
        message_text = response["choices"][0]["message"]['content']      
        print(message_text)
        history.report = json.loads(message_text)
        history.save()        
        return JsonResponse({"report" : json.loads(message_text)}, status=status.HTTP_200_OK, safe=False)
    except Exception as e:
        return Response(str(e), status=status.HTTP_500_INTERNAL_SERVER_ERROR)
    

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def make_sample_question(request, history_id):
    history = History.objects.get(id=history_id, user=request.user)
    # 히스토리 chat_log 최근 5개만 가져오기
    chat_log = history.chat_log[-5:]
    
    try:
        response = openai.ChatCompletion.create(
			model='gpt-3.5-turbo',
			messages = [
                {'role' : 'system', 'content': 'grow모델의 각 단계별 질문 예시를 구체적으로 5개씩 G:["quetion1", "quetion2","quetion3","quetion4","quetion5"], R:["quetion1", "quetion2","quetion3","quetion4","quetion5"], O:["quetion1", "quetion2","quetion3","quetion4","quetion5"], W:["quetion1", "quetion2","quetion3","quetion4","quetion5"]로 json형식으로 만들어줘'},
                {'role' : 'user', 'content': f'{chat_log} 다음 질문을 추천해줘'}
            ]
        )
        message_text = response['choices'][0]['message']['content']
        
        return JsonResponse({'sample_question' :  json.loads(message_text)}, status = status.HTTP_200_OK, safe=False)
    except Exception as e:
        return Response(str(e), status=status.HTTP_500_INTERNAL_SERVER_ERROR)
     