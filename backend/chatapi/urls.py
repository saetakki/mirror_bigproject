from chatapi.views import set_persona, audio_to_text, get_text, get_ChatGPT_response, make_report,  make_sample_question
from django.urls import path

urlpatterns = [
    path('set_persona/', set_persona),
    path('audio_to_text/<int:history_id>/', audio_to_text),
    path('get_text/<int:history_id>/', get_text),
    path('get_ChatGPT_response/<int:history_id>/', get_ChatGPT_response),
    path('make_report/<int:history_id>/', make_report),
    path('make_sample_question/<int:history_id>/', make_sample_question)
]	
