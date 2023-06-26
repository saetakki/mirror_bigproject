from chatapi.views import set_persona, audio_to_text, get_text, get_ChatGPT_response, make_report, text_to_speech
from django.urls import path

urlpatterns = [
    path('set_persona1/', set_persona),
    path('audio_to_text1/<int:history_id>/', audio_to_text),
    path('get_text1/<int:history_id>/', get_text),
    path('get_ChatGPT_response1/<int:history_id>/', get_ChatGPT_response),
    path('text_to_speech1/<int:history_id>/', text_to_speech),
    path('make_report1/<int:history_id>/', make_report),
]	