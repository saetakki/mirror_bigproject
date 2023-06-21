from django.db import models
from django.contrib.auth.models import User

# 유저 프로필
class UserProfile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    real_name = models.CharField(max_length=100)
    profile_image = models.ImageField(upload_to='images', default='images/Default-Profile-Image.png')

    def __str__(self):
        return self.real_name

# 페르소나
class Persona(models.Model):
    persona_name = models.CharField(max_length=100)
    age = models.IntegerField()
    gender = models.CharField(max_length=100)
    position = models.CharField(max_length=100)
    department = models.CharField(max_length=100)
    state = models.CharField(max_length=100)
    
    def __str__(self):
        return self.persona_name
    
# 히스토리
class History(models.Model):
    # 유저와 히스토리는 1:N 관계
    # 히스토리와 페르소나는 1:1 관계
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    persona = models.ForeignKey(Persona, on_delete=models.CASCADE)
    date = models.DateTimeField(auto_now_add=True)
    bookmark = models.BooleanField(default=False)
    chat_log = models.JSONField()
    report = models.JSONField()