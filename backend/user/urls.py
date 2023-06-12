from django.urls import path
# from .views import RegisterView, LoginView, LogoutView, UserDetailView
from . import views
urlpatterns = [
    path('register/', views.RegisterView.as_view()),
    path('login/', views.LoginView.as_view()),
    path('logout/', views.LogoutView.as_view()),
    path('user/', views.UserDetailView.as_view()),
]
