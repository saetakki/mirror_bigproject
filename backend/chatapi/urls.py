from chatapi.views import  start_roleplay, convert_audio_to_text, get_chat_response, make_report, continue_text, convert_text_to_speech
from django.urls import path

urlpatterns = [
    path('role_play/<int:persona_id>',start_roleplay),
    path('post_audio/', convert_audio_to_text),
    path('get_chat_response/<str:message_input>', get_chat_response),
    path('make_report/<int:history_id>', make_report), 
    path('continue_text/<int:persona_id>/<str:question>', continue_text),
    path('convert_text_to_speech/<str:message>', convert_text_to_speech)
]	