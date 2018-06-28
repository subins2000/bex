from rest_framework import serializers
from books.models import Books


class BooksSerializer(serializers.ModelSerializer):

    class Meta:

        model = Books
        fields = ('user', 'title', 'author', 'semester', 'branch', 'description')
