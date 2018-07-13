from django.http import Http404
from rest_framework.authentication import TokenAuthentication
from rest_framework.generics import CreateAPIView, ListAPIView
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.status import HTTP_404_NOT_FOUND
from rest_framework.views import APIView

from books.models import Books
from books.serializers import BookReadSerializer, BookWriteSerializer


class BookAdd(CreateAPIView):

    queryset = Books.objects.all()
    serializer_class = BookWriteSerializer

    authentication_classes = (TokenAuthentication,)
    permission_classes = (IsAuthenticated,)


class BookList(ListAPIView):
    """List books of (added by) user
    """

    serializer_class = BookReadSerializer

    authentication_classes = (TokenAuthentication,)
    permission_classes = (IsAuthenticated,)

    def get_queryset(self):
        return Books.objects.filter(user=self.request.user).values()


class BookInfo(APIView):

    authentication_classes = (TokenAuthentication,)
    #permission_classes = (IsAuthenticated,)

    def get_object(self, slug):
        try:
            return Books.objects.get(slug=slug).__dict__
        except Books.DoesNotExist:
            raise Http404


    def get(self, request, slug, format=None):
        book = self.get_object(slug)
        serializer = BookReadSerializer(book, context={'request': request})
        return Response(serializer.data)

