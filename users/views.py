from django.shortcuts import render
from rest_framework.authentication import TokenAuthentication, BasicAuthentication
from rest_framework.authtoken.models import Token
from rest_framework.generics import CreateAPIView
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.views import APIView

from users.models import Users
from users.serializers import UsersSerializer


class UsersRegister(CreateAPIView):

    queryset = Users.objects.all()
    serializer_class = UsersSerializer


class UsersLogin(APIView):

    authentication_classes = (TokenAuthentication, BasicAuthentication,)
    permission_classes = (IsAuthenticated,)

    def get(self, request, format=None):
        token, created = Token.objects.get_or_create(user=request.user)

        user = Users.objects.get(username=request.user.username)

        print(vars(request.user));

        content = {
            'name': user.name,
            'token': str(token),
            'username': user.username,
        }

        return Response(content)
