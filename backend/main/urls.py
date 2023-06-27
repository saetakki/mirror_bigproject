from django.urls import path
from .views import  (list_history, detail_or_delete_history, 
                     list_bookmarked_history, bookmark_history, profile, update_profile_image, 
                     signup, login, logout, find_id, find_password, create_dummy_data)


urlpatterns = [
    path('history/', list_history),
    path('history/<int:history_id>/', detail_or_delete_history),
    path('history/bookmarked/', list_bookmarked_history),
    path('history/<int:history_id>/bookmark/', bookmark_history),
    path('profile/', profile),
    path('profile/image/', update_profile_image),
    path('signup/', signup),
    path('login/', login),
    path('logout/', logout),
    path('find_id/', find_id),
    path('find_password/', find_password),
    path('create_dummy_data/', create_dummy_data)
]