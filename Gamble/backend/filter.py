import django_filters

from .models import *


class BookFilter(django_filters.FilterSet):
    class Meta:
        model = Book
        fields = ['title', 'author', 'isbn', 'info']


class UserBookFilter(django_filters.FilterSet):
    class Meta:
        model = UserBook
        fields = ['owner', 'status', 'price', 'buyer', 'created_at', 'book', 'description']


class WishListFilter(django_filters.FilterSet):
    class Meta:
        model = WishList
        fields = ['book', 'user', 'price', 'wish_true', 'created_at']


class NotificationFilter(django_filters.FilterSet):
    class Meta:
        model = Notifications
        fields = ['user', 'subject', 'message', 'is_read', 'created_at']
