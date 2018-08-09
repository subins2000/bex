"""books URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/2.0/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.conf.urls import url
from django.urls import path
from rest_framework.urlpatterns import format_suffix_patterns

from . import views


urlpatterns = [
    path('api/books/add', views.BookAdd.as_view()),
    path('api/books/list', views.BookList.as_view()),
    path('api/books/search', views.BookSearch.as_view()),
    url(r'^api/book/(?P<slug>[-\w]+)$', views.BookInfo.as_view()),
    url(r'^api/book/(?P<slug>[-\w]+)/chat$', views.BookChat.as_view()),
]

urlpatterns = format_suffix_patterns(urlpatterns)
