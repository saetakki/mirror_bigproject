from django.urls import path
from .views import  (list_history, detail_or_delete_history, 
                     list_bookmarked_history, bookmark_history, loginsuccess, profile, update_profile_image, )


urlpatterns = [
    path('history/', list_history),
    path('history/<int:history_id>/', detail_or_delete_history),
    path('history/bookmarked/', list_bookmarked_history),
    path('history/<int:history_id>/bookmark/', bookmark_history),
    path('loginsuccess/', loginsuccess),
    path('profile/', profile),
    path('profile/image/', update_profile_image),

    
]