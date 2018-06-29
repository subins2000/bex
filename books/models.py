from django.db import models

from users.models import Users


class Books(models.Model):

    user = models.ForeignKey(
        Users,
        on_delete=models.CASCADE,
        db_column='user',
    )
    title = models.CharField(max_length=200)
    author = models.CharField(max_length=60)
    semester = models.IntegerField()
    branch = models.CharField(max_length=10)
    description = models.CharField(max_length=500)
    created_at = models.DateTimeField(auto_now_add=True)
