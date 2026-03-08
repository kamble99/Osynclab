from django.db import models
from django.contrib.auth.models import User,AbstractUser

class User(AbstractUser):
    email=models.EmailField(unique=True)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.username

# Create your models here.
