from django.db import models
from django.utils.crypto import get_random_string

from users.models import User


class Books(models.Model):

    author = models.CharField(max_length=60)
    branch = models.CharField(max_length=10)
    created_at = models.DateTimeField(auto_now_add=True)
    description = models.CharField(max_length=500)
    photo = models.ImageField(
        blank=True,
        null=True,
        upload_to='books/%Y/%m/%d/'
    )
    semester = models.IntegerField()
    slug = models.CharField(
        max_length=12,
        default=get_random_string(12)
    )
    title = models.CharField(max_length=200)
    user = models.ForeignKey(
        User,
        on_delete=models.CASCADE,
        db_column='user',
    )


class BookChat(models.Model):

    book_slug = models.ForeignKey(
        Books,
        on_delete=models.CASCADE,
    )
    msg = models.CharField(max_length=500)
    receiver = models.ForeignKey(
        User,
        on_delete=models.CASCADE,
    )
    sent = models.DateTimeField(auto_now_add=True)
