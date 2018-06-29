from rest_framework import serializers
from books.models import Books


class BooksSerializer(serializers.ModelSerializer):

    user = serializers.HiddenField(
        default=serializers.CurrentUserDefault(),
    )

    class Meta:

        model = Books
        fields = '__all__'
