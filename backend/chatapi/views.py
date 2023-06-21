from django.shortcuts import render
# from django.contrib.auth.models import User
from chatapi.models import Persona, History, UserProfile
from django.http import JsonResponse
import openai
from decouple import config
import json, random
import pickle
import sys

# Retrieve Enviornment Variables
openai.organization = config("OPEN_AI_ORG")
openai.api_key = config("OPEN_AI_KEY")
ELEVEN_LABS_API_KEY = config("ELEVEN_LABS_API_KEY")

# Open AI - Whisper
# Convert audio to text
def convert_audio_to_text(audio_file):
  try:
    transcript = openai.Audio.transcribe("whisper-1", audio_file)
    message_text = transcript["text"]
    return message_text
  except Exception as e:
    return

# Open AI - Chat GPT
# Convert audio to text
def get_chat_response(message_input):

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
    return message_text
  except Exception as e:
    return

def make_report(filename='output.json'):
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
		return message_text
	except Exception as e:
		return print(e)

# main의 models.py에서 페르소나 설정을 받아 gpt에 넣어서 상담역할극을 시작하게 하는 함수



def set_persona(selected_persona, txt):    
    try:
        response = openai.ChatCompletion.create(
            model="gpt-3.5-turbo",
            messages=[{"role": "user", "content": txt}]
        )
        message_text = response["choices"][0]["message"]['content']
        print(message_text)
        return message_text
    except Exception as e:
        return print(e)
    
def start_roleplay(persona_id):
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
        return message_text
    except Exception as e:
            return JsonResponse({'error': 'Persona not found'})
    
start_roleplay(1)


    
def continue_text(chat_log = None, persona = None, question = None):
    if not chat_log:
        with open('output.json', 'r', encoding='utf-8') as f:
            txt = json.load(f)
    if not question:
        question = '오늘 기분은 어떻세요?'
    txt = json.dumps(txt, ensure_ascii=False, indent = 4)
    if persona:
        persona_name = persona.persona_name
        age = persona.age
        gender = persona.gender
        position = persona.position
        department = persona.department
        state = persona.state
        txt = f"""이제부터 상담 역할극을 할건데, 나는 상담하는 사람, 너는 상담 당하는 사람으로, {persona_name}라는 이름의 {age}살 {gender}로 
    	{department}의 {position}이고 {state}를 원하는 역할을 해줘.  {txt}""".replace("\n", '').replace("    ", "")    	    
    print(txt)
    try:
        response = openai.ChatCompletion.create(
            model="gpt-3.5-turbo",
			messages=[{"role": "user", "content": f"{txt} 위의 대화에 이어서 나는 user고 너는 assistant역할로 상담역할극을 다시 시작하자. 내 질문 : {question}"}]
   		)
        message_text = response["choices"][0]["message"]['content']
        print(message_text)
        return message_text
    except Exception as e:
        return print(e)
    
if __name__ == "__main__":
    make_report()
    
"--------------------------------------------------------------------------------------------------------------------------------------------------------------"


# Create your views here.
def get_recent_messages():

  # Define the file name
  file_name = "stored_data.json"
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

def convert_audio_to_text(audio_file):
  try:
    transcript = openai.Audio.transcribe("whisper-1", audio_file)
    message_text = transcript["text"]
    return message_text
  except Exception as e:
    return

# Open AI - Chat GPT
# Convert audio to text
def get_chat_response(message_input):

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
    return message_text
  except Exception as e:
    return

def make_report(filename='output.json'):
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
		return message_text
	except Exception as e:
		return print(e)

def set_persona(selected_persona):
    persona_name = selected_persona.persona_name
    age = selected_persona.age
    gender = selected_persona.gender
    position = selected_persona.position
    department = selected_persona.department
    state = selected_persona.state
    
    txt = f"""이제부터 상담 역할극을 할건데, 나는 상담하는 사람, 너는 상담 당하는 사람으로, {persona_name}라는 이름의 {age}살 {gender}로 
    {department}의 {position}이고 {state}를 원하는 역할을 해줘""".replace("\n", '').replace("    ", "")
    print(txt)
    try:
        response = openai.ChatCompletion.create(
            model="gpt-3.5-turbo",
			messages=[{"role": "user", "content": txt}]
   		)
        message_text = response["choices"][0]["message"]['content']
        print(message_text)
        return message_text
    except Exception as e:
        return print(e)
    
def continue_text(chat_log = None, persona = None, question = None):
    if not chat_log:
        with open('output.json', 'r', encoding='utf-8') as f:
            txt = json.load(f)
    if not question:
        question = '오늘 기분은 어떻세요?'
    txt = json.dumps(txt, ensure_ascii=False, indent = 4)
    if persona:
        persona_name = persona.persona_name
        age = persona.age
        gender = persona.gender
        position = persona.position
        department = persona.department
        state = persona.state
        txt = f"""이제부터 상담 역할극을 할건데, 나는 상담하는 사람, 너는 상담 당하는 사람으로, {persona_name}라는 이름의 {age}살 {gender}로 
    	{department}의 {position}이고 {state}를 원하는 역할을 해줘.  {txt}""".replace("\n", '').replace("    ", "")    	    
    print(txt)
    try:
        response = openai.ChatCompletion.create(
            model="gpt-3.5-turbo",
			messages=[{"role": "user", "content": f"{txt} 위의 대화에 이어서 나는 user고 너는 assistant역할로 상담역할극을 다시 시작하자. 내 질문 : {question}"}]
   		)
        message_text = response["choices"][0]["message"]['content']
        print(message_text)
        return message_text
    except Exception as e:
        return print(e)
