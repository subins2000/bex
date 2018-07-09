from django.shortcuts import render
from rest_framework.authentication import TokenAuthentication, BasicAuthentication
from rest_framework.authtoken.models import Token
from rest_framework.generics import CreateAPIView
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.response import Response
from rest_framework.status import HTTP_200_OK, HTTP_401_UNAUTHORIZED, HTTP_404_NOT_FOUND
from rest_framework.views import APIView

from books.models import Books
from users.models import Users
from users.serializers import UsersSerializer


class UsersRegister(CreateAPIView):

    queryset = Users.objects.all()
    serializer_class = UsersSerializer


class UsersLogin(APIView):

    authentication_classes = (BasicAuthentication,)
    permission_classes = (IsAuthenticated,)

    def get(self, request, format=None):
        token, created = Token.objects.get_or_create(user=request.user)

        user = Users.objects.get(username=request.user.username)

        content = {
            'name': user.name,
            'token': str(token),
            'username': user.username,
        }

        return Response(content)


class AuthCheck(APIView):

    authentication_classes = (TokenAuthentication,)

    def get(self, request, format=None):
        if request.user.is_authenticated:
            return Response(status=HTTP_200_OK)
        else:
            return Response(status=HTTP_401_UNAUTHORIZED)


class UserView(APIView):

    authentication_classes = (TokenAuthentication,)
    permission_classes = (IsAuthenticated,)

    def post(self, request, format=None):
        username = request.data.get('username', None)

        try:
            user = Users.objects.get(username=username)

            try:
                books = Books.objects.filter(user=user).values(
                    'id',
                    'photo',
                    'title',
                )
            except Exception as e:
                print(e)
                books = {}

            content = {
                'name': user.name,
                'username': user.username,
                'books': books,
            }

            return Response(content)
        except:
            return Response(status=HTTP_404_NOT_FOUND)

