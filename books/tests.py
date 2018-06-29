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
        bookTitle = 'Calculus';
        bookAuthor = 'Ben';
        bookSemester = '1';
        bookBranch = 'cse';
        bookDescription = 'Textbook for KTU';

        response = self.client.post(
            '/api/books/add',
            HTTP_AUTHORIZATION=self.authToken,
            data={
                'title': bookTitle,
                'author': bookAuthor,
                'semester': bookSemester,
                'branch': bookBranch,
                'description': bookDescription,
            }
        )

        self.assertEqual(response.status_code, 201)

        book = Books.objects.get(title=bookTitle)
        self.assertEqual(book.title, bookTitle)
        self.assertEqual(book.author, bookAuthor)
        self.assertEqual(book.semester, int(bookSemester))
        self.assertEqual(book.branch, bookBranch)
        self.assertEqual(book.description, bookDescription)
