from django.contrib.auth.models import AnonymousUser, User
from django.test import TestCase

from rest_framework.authtoken.models import Token
from rest_framework.test import APITestCase, APIClient

from .models import Books
from .views import BookAdd


class BookAddTest(APITestCase):
    def setUp(self):
        self.client = APIClient(enforce_csrf_checks=True)
        self.user = User.objects.create_user(
            username='jacob',
            email='jacob@example.com',
            password='password',
        )
        self.authToken = 'Token ' + str(Token.objects.create(user=self.user))

    def testAnonymousUserAdd(self):
        response = self.client.post(
            '/api/books/add',
            data={
                'title': 'Calculus',
                'author': 'Ben',
                'semester': '1',
                'branch': 'cse',
                'description': 'Textbook for KTU',
            }
        )

        # 401 Forbidden
        self.assertEqual(response.status_code, 401)

    def testUserAdd(self):
        response = self.client.post(
            '/api/books/add',
            HTTP_AUTHORIZATION=self.authToken,
            data={
                'title': 'Calculus',
                'author': 'Ben',
                'semester': '1',
                'branch': 'cse',
                'description': 'Textbook for KTU',
            }
        )

        self.assertEqual(response.status_code, 201)
