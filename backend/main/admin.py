from django.contrib import admin
from .models import UserProfile, Persona, History

# Register your models here.

admin.site.register(UserProfile)
admin.site.register(Persona)
admin.site.register(History)

