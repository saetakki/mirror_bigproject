from rest_framework import serializers
from .models import UserProfile, Persona, History
from django.contrib.auth.models import User

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['username', 'email', 'password']

class UserProfileSerializer(serializers.ModelSerializer):
    user = UserSerializer()    
    class Meta:
        model = UserProfile
        fields = ['user', 'real_name', 'profile_image']

class PersonaSerializer(serializers.ModelSerializer):
    class Meta:
        model = Persona
        fields = ['persona_name', 'age', 'gender', 'position', 'department', 'state']

class HistorySerializer(serializers.ModelSerializer):
    persona = PersonaSerializer()
    class Meta:
        model = History
        fields = ['id','date', 'bookmark','persona', 'report']

class ChatLogReportSerializer(serializers.ModelSerializer):
    persona = PersonaSerializer()
    class Meta:
        model = History
        fields = ['id','persona', 'chat_log', 'report']