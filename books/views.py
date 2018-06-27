from rest_framework.generics import CreateAPIView

from books.models import Books


class BookAdd(CreateAPIView):

    queryset = Books.objects.all()
