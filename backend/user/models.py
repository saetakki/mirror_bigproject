from django.db import models
from django.core.validators import RegexValidator

# Create your models here.
class User(models.Model):
    
    name = models.CharField(max_length=50, null=False, blank=False)
    
    password = models.CharField( max_length=128, null=False, blank=False)
    email = models.EmailField(max_length=128, null=False, blank=False, unique=True)
    
    phoneNumberRegex = RegexValidator(regex = r'^01([0|1|6|7|8|9]?)-?([0-9]{3,4})-?([0-9]{4})$')
    phone = models.CharField(validators = [phoneNumberRegex], max_length = 11, unique = True)
    
    def __str__(self):
        return self.name
    