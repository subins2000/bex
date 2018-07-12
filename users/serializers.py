from rest_framework import serializers
from users.models import Users


class UsersSerializer(serializers.ModelSerializer):

    email = serializers.EmailField(
        allow_blank=False,
        max_length=100,
        required=True,
    )

    class Meta:
        model = Users
        fields = ('username', 'password', 'email', 'name')

        extra_kwargs = {
            'password': {
                'write_only': True
            },
        }

    def create(self, validated_data):
        user = Users.objects.create(
            username=validated_data['username'],
            email=validated_data['email'],
            name=validated_data['name'],
        )

        user.set_password(validated_data['password'])
        user.save()

        return user
