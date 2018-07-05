from django.db import models

from users.models import User


class Books(models.Model):

    user = models.ForeignKey(
        User,
        on_delete=models.CASCADE,
        db_column='user',
    )
    title = models.CharField(max_length=200)
    author = models.CharField(max_length=60)
    semester = models.IntegerField()
    branch = models.CharField(max_length=10)
    description = models.CharField(max_length=500)
    photo = models.FileField(blank=True, null=True)
    created_at = models.DateTimeField(auto_now_add=True)
