from chatapi.views import  (convert_audio_to_text, get_chat_response, make_report, 
                            continue_text, convert_text_to_speech, set_persona)
from django.urls import path

urlpatterns = [
    path('set_persona/', set_persona),
    path('make_report/<int:history_id>/', make_report),    
    path('post_audio/', convert_audio_to_text),
    path('get_chat_response/<int:history_id>/', get_chat_response),	     
    path('continue_text/<int:history_id>/', continue_text),
    path('convert_text_to_speech/<str:message>/', convert_text_to_speech),     
]	