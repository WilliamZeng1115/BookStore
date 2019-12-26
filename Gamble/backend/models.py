from django.db import models
from django.contrib.auth.models import User


# title should include version as well (or year, we can concat it -> make sure its unique)
class Book(models.Model):
    title = models.CharField(max_length=1024)
    author = models.CharField(max_length=1024)
    isbn = models.CharField(max_length=128)
    info = models.CharField(max_length=2048)
    queued = models.BooleanField()


class UserBook(models.Model):
    book = models.ForeignKey(Book, related_name="selling", on_delete=models.CASCADE)
    owner = models.ForeignKey(User, related_name="owner", on_delete=models.CASCADE)
    status = models.IntegerField()
    buyer = models.ForeignKey(User, related_name="buyer", on_delete=models.SET_NULL, null=True)
    price = models.FloatField()
    description = models.CharField(max_length=2048)
    created_at = models.DateTimeField(auto_now_add=True)


class WishList(models.Model):
    book = models.ForeignKey(Book, related_name="wished", on_delete=models.CASCADE)
    user = models.ForeignKey(User, related_name="wish", on_delete=models.CASCADE)
    price = models.FloatField()
    wish_true = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)


class Notifications(models.Model):
    user = models.ForeignKey(User, related_name="notifications", on_delete=models.CASCADE)
    subject = models.CharField(max_length=255)
    message = models.CharField(max_length=2048)
    is_read = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)
