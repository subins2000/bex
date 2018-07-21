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


class BookSearch(ListAPIView):

    serializer_class = BookReadSerializer

    def get_queryset(self):

        authorQuery = self.request.query_params.get('authorQuery', None)
        bookQuery = self.request.query_params.get('bookQuery', None)
        branch = self.request.query_params.get('branch', None)
        semester = self.request.query_params.get('semester', None)

        filters = {}

        if bookQuery is not None:
            filters['title__icontains'] = bookQuery

        if branch is not None and len(branch) > 1:
            filters['branch'] = branch

        if semester is not None and len(semester) is 1:
            filters['semester'] = semester

        return Books.objects.filter(**filters)
