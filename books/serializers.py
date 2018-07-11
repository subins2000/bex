from django.conf import settings
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
    user = serializers.HiddenField(
        default=serializers.CurrentUserDefault(),
    )

    class Meta:

        model = Books
        fields = '__all__'

    def get_photo(self, book):
        request = self.context.get('request', None)

        if book['photo']:
            return request.build_absolute_uri(settings.MEDIA_URL + book['photo'])
        else:
            return None
