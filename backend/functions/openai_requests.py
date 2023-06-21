import openai
from decouple import config
import json

from functions.database import get_recent_messages


# Retrieve Enviornment Variables
openai.organization = config("OPEN_AI_ORG")
openai.api_key = config("OPEN_AI_KEY")


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

import pickle

if __name__ == "__main__":
    make_report()
    
    
    