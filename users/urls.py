from django.urls import path

from . import views


urlpatterns = [
    path('api/users/register', views.UsersRegister.as_view()),
    path('api/users/login', views.UsersLogin.as_view()),
    path('api/users/authcheck', views.AuthCheck.as_view()),
]
