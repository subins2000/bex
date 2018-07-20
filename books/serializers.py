from django.conf import settings
from django.contrib.auth.models import User
from rest_framework import serializers

from books.models import Books


class BookWriteSerializer(serializers.ModelSerializer):

    user = serializers.HiddenField(
        default=serializers.CurrentUserDefault(),
    )

    class Meta:

        model = Books
        fields = '__all__'

class BookReadSerializer(serializers.ModelSerializer):
    '''For reading book's info
    '''

    photo = serializers.SerializerMethodField()
    user = serializers.SerializerMethodField()

    class Meta:

        model = Books
        fields = '__all__'

    def get_photo(self, book):
        request = self.context.get('request', None)

        if type(book) is dict and book['photo']:
            return request.build_absolute_uri(settings.MEDIA_URL + book['photo'])
        elif type(book) is Books and book.photo:
            return request.build_absolute_uri(settings.MEDIA_URL + book.photo.name)
        else:
            return None

    def get_user(self, book):
        try:
            return User.objects.get(pk=book['user_id']).username
        except:
            return None
