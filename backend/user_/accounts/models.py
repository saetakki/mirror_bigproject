from django.db import models
from django.contrib.auth.models import BaseUserManager, AbstractBaseUser
# Create your models here.

class UserManager(BaseUserManager):
    def create_user(self, email, name, password=None):
        
        user = self.model(
            email=self.normalize_email(email),
            name=name,
        )
        
        user.set_password(password)
        user.save(using=self._db)
        return user
    
    def create_superuser(self, email, name, password):
        user = self.create_user(
            email,
            name=name,
            password=password,
        )
        
        user.is_admin = True
        user.save(using=self._db)
        return user
    
class User(AbstractBaseUser):
    email = models.EmailField(
        verbose_name='email',
        max_length=100,
        unique=True,
    )
    name = models.CharField(max_length=30)
    is_active = models.BooleanField(default=True)
    is_admin = models.BooleanField(default=False)
    
    objects = UserManager()
    
    USERNAME_FIELD = 'email'   # 헬퍼 클래스 사용 설정
    REQUIRED_FIELDS = ['name']   # username에 email 사용
    
    def __str__(self):
        return self.email
    
    def has_perm(self, perm, obj=None):
        return True
    # True 반환할 경우 해당 Object로 사용 권한 확인하는 절차 필요
    
    def has_module_perms(self, app_label):
        return True
    # True 를 반환하여 주어진 앱 모델(model)에 접근 가능하도록
    
    @property
    def is_staff(self):
        return self.is_admin
    # True 반환 시 장고의 관리자 화면 로그인 가능
    
    class Meta:
        db_table = 'user'
        
# class DefaultAccountAdapter(object):
    
#     error_messages = {
#         "username_blacklisted": _(
#             "입력하신 사용자 이름을 사용할 수 없습니다. 다른 이름을 입력해 주세요."
#         ),
#         "too_many_login_attempts": _(
#             "로그인 실패 회수를 초과하였습니다. 나중에 다시 시도해주세요."
#             ),
#         "email_taken": _("이미 가입되어 있는 이메일 입니다.")
#     }