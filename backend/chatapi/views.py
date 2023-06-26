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
# Retrieve Enviornment Variables
openai.organization = config("OPEN_AI_ORG")
openai.api_key = config("OPEN_AI_KEY")

import sys
import urllib.request
# --------------------------------------------------------------------------------------------------------------------------------------------------------------

# 1. audio 입력받아 tts한후 db저장
# 2. 메세이 입력받아 db 저장
# 3. chatgpt 보내기 / 오디오파일


# 1. 페르소나 세팅과 저장
# 사용자가 페르소나를 만들면 
# 프론트로부터 {'persona_name' : persona_name, 'age':age, 'gender':gender', 'position':position, 'department' : department, 'state':state}
# 이를 persona table 저장 후 새로운 히스토리를 만들어 저장 후 프론트에게 history_id와 text전달
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
    
    """
    준호님 이거 기존에 있던 내용 바꾼 내용인데 
    learn_instruction 이걸 프론트에게 보낼 필요 없다고 생각하여 'text' 에 아무것도 안보내거나, 
    페르소나 설정 완료 메세지 보내는게 어떤가요? 
    저희가 사용자에게 프롬프트 엔지니어링 한 내용을 보여주진 않을거니까라고 생각해서입니다.
    그리고 밑에 저희가 프론트에게 문자열을 보낼 때 text로 보내는걸로 통일해서 만들었습니다. 
    """
    
    # print(type(history.chat_log))
    # messages = history.chat_log
    return JsonResponse({'history_id': history.id, 'text': '페르소나 설정 완료되었습니다'}, status=200)

# audio -> text 변환 함수
# 사용자가 audio 파일을 올리면, 프론트에서 이를 audio_file로 전달(프론트 헤더에 파일 형식이 명시되어야 함 
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
        return JsonResponse({'text' : message_text} , status=200)
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
    return JsonResponse({}, status = 200)




# history.chat_log에서 대화를 뽑아 chatgpt에게 전달하여 반응을 받아오는 함수
"""
이거 논리상으로는 프론트에서 요청이 없어도 되긴 하는데
프론트에서 request 없으면 백엔드에서 response 보내는게 어렵다고 하네요
웹소켓이나 스케줄링 등 해야되서 프론트에서 그냥 요청 보내주는게 가장 간단할 거 같아서 이렇게 작성했습니다.
이거 제대로 작동하는지 확인하고 싶은데 api_key가 오류나서(아마 찬님꺼 다 쓴듯) 제꺼도 안되서
어떻게 해야할지 고민입니다.
"""
# 프론트에서 받을건 없어 보임
# 프론트에게 key:'text', audio_file로 전달
@api_view(["POST"])
@permission_classes([IsAuthenticated])
def get_ChatGPT_response(request, history_id):
    history = History.objects.get(id=history_id, user= request.user)
    messages = history.chat_log
    try:
        response = openai.ChatCompletion.create(
            model="gpt-3.5-turbo",
            messages=messages
            )
        message_text = response["choices"][0]["message"]["content"]
        history.chat_log.append({'role':'assistant', 'content':message_text})
        history.save()
        return JsonResponse({'text': json.dumps(message_text, ensure_ascii=False)}, status=status.HTTP_200_OK)
    except Exception as e:
        return JsonResponse({'msg' : "001"}, status=status.HTTP_500_INTERNAL_SERVER_ERROR) 

"""
준호님
한국어 음성 api찾아야 할듯? 음성이 너무 외국어 억양입니다. 월요일까지 한번 찾아볼게요
이것도 마찬가지로 요청이 있는걸로 생각하고 했습니다. 
어떻게 해도 이걸 get_ChatGPT_response1 합쳐서 json으로 보내려고 해도 안되더라고요 그래서 따로 함수를 작성했습니다.
이함수로 요청받으면 자동으로 스트리밍이 재생됩니다
"""
from django.http import StreamingHttpResponse
@api_view(['POST'])
@permission_classes([IsAuthenticated])
def text_to_speech(request, history_id):
    history = History.objects.get(id=history_id, user=request.user)
    CHUNK_SIZE = 1024
    male_voices = ['jinho', 'nsinu', 'njinho', 'njihun', 'njooahn', 'nseonghoon', 'njihwan', 
                   'nsiyoon','ntaejin','nyoungil','nseungpyo','nwontak', 'njonghyun', 'njoonyoung', 'njaewook',
                   'nes_c_kihyo' ]
    female_voices = ['nara', 'nminyoung', 'nyejin', 'mijin', 'njiyun', 'nsujin', 'neunyoung', 
                     'nsunkyung','nyujin', 'nsunhee', 'nminseo', 'njiwon', 'nbora', 'nes_c_hyeri',
                     'nes_c_sohyun', 'nes_c_mikyung','ntiffany' ]
    if '남' in history.persona.gender:
        voice_id = random.choice(male_voices)
    else:
        voice_id = random.choice(female_voices)
    
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
        return StreamingHttpResponse(response.iter_content(chunk_size=CHUNK_SIZE), content_type='audio/mp3')
    except requests.HTTPError as e:
        return JsonResponse({'msg': '002'}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
    


@api_view(['POST'])
@permission_classes([IsAuthenticated])
def make_report(request, history_id):
    try:
        history = History.objects.get(id=history_id, user=request.user)
    except History.DoesNotExist:
        raise Http404('History does not exist')
    chat_log = history.chat_log
    try:
        response = openai.ChatCompletion.create(
			model="gpt-3.5-turbo",
			messages=[{"role": "user", "content": f' "{chat_log}" 다음의 상담내용을 user입장에서 Overview, what went well, what could be improved의 3항목으로 json 형태의 보고서로 작성해줘 '}])
        message_text = response["choices"][0]["message"]['content']      
        print(message_text)
        history.report = message_text
        history.save()        
        return JsonResponse({"report" : json.loads(message_text)}, status=status.HTTP_200_OK, safe=False)
    except Exception as e:
        return Response(str(e), status=status.HTTP_500_INTERNAL_SERVER_ERROR)
    
