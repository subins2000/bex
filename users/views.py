from django.shortcuts import render
from rest_framework.generics import CreateAPIView

from users.models import Users
from users.serializers import UsersSerializer


class UsersRegister(CreateAPIView):

    queryset = Users.objects.all()
    serializer_class = UsersSerializer
