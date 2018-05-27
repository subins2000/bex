from django.urls import path

from . import views


urlpatterns = [
    path('api/users/register', views.UsersRegister.as_view()),
]
