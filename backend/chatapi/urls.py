from chatapi.views import  (convert_audio_to_text, make_report,
                            continue_text, convert_text_to_speech, set_persona, get_text_response, )
from chatapi.views1 import set_persona1, audio_to_text1, get_text1, get_ChatGPT_response1, make_report1, text_to_speech1
from django.urls import path

urlpatterns = [
    path('set_persona/', set_persona),
    path('make_report/<int:history_id>/', make_report),    
    path('post_audio/<int:history_id>/', convert_audio_to_text),
    # path('get_chat_response/<int:history_id>/', get_chat_response),	     
    path('continue_text/<int:history_id>/', continue_text),
    path('convert_text_to_speech/<str:message>/', convert_text_to_speech),
    path('get_text_response/<int:history_id>/', get_text_response),
    
    
    path('set_persona1/', set_persona1),
    path('audio_to_text1/<int:history_id>/', audio_to_text1),
    path('get_text1/<int:history_id>/', get_text1),
    path('get_ChatGPT_response1/<int:history_id>/', get_ChatGPT_response1),
    path('text_to_speech1/<int:history_id>/', text_to_speech1),
    path('make_report1/<int:history_id>/', make_report1),
]	