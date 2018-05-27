from django.contrib.auth.models import User
from django.db import models


class Users(User):

    name = models.CharField(max_length=60)
    created_at = models.DateTimeField(auto_now_add=True)
