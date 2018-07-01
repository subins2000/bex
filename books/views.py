from rest_framework.authentication import TokenAuthentication
from rest_framework.generics import CreateAPIView, ListAPIView
from rest_framework.permissions import IsAuthenticated

from books.models import Books
from books.serializers import BooksSerializer


class BookAdd(CreateAPIView):

    queryset = Books.objects.all()
    serializer_class = BooksSerializer

    authentication_classes = (TokenAuthentication,)
    permission_classes = (IsAuthenticated,)

class BookList(ListAPIView):
    """List books of (added by) user
    """

    serializer_class = BooksSerializer

    authentication_classes = (TokenAuthentication,)
    permission_classes = (IsAuthenticated,)

    def get_queryset(self):
        return Books.objects.filter(user=self.request.user).values()
