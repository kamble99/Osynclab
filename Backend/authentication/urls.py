from django.urls import path
from .views import register,login,semaphore,deadlock,scheduler

urlpatterns = [
    path("register/", register),
    path("login/", login),
    path("semaphore/", semaphore),
    path('deadlock/', deadlock),
    path('scheduler/', scheduler),

]