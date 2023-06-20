from django.contrib.auth.models import User
from rest_framework import serializers
from django.contrib.auth import get_user_model
from rest_framework.validators import UniqueValidator
from django.utils.translation import gettext as _

# 회원가입, 로그인
class UserSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True)
    
    class Meta:
        model = get_user_model()
        fields = ('id', 'email', 'password', 'name')
        
# 패스워드 필요 없는 다른 테이블에서 사용할 용도
class UserInfoSerializer(serializers.ModelSerializer):
    
    class Meta:
        model = get_user_model()
        fields = ('id', 'email', 'name')
        
        
# 이메일 중복 확인
