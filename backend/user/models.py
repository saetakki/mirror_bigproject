from django.db import models
from django.core.validators import RegexValidator

# Create your models here.
class User(models.Model):
    
    name = models.CharField(max_length=50)
    gender = models.CharField(max_length=1)
    birth = models.DateField()
    position = models.CharField(max_length=50)
    department = models.CharField(max_length=50)
    email = models.EmailField(max_length=128)
    
    phoneNumberRegex = RegexValidator(regex = r'^01([0|1|6|7|8|9]?)-?([0-9]{3,4})-?([0-9]{4})$')
    phone = models.CharField(validators = [phoneNumberRegex], max_length = 11, unique = True)
    
    def __str__(self):
        return self.name
    