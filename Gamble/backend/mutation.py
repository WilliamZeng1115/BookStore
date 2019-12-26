from graphene import Boolean, Field
from django.db.models import Q
from graphql_extensions.auth.decorators import login_required
import requests
import os

from .inputs import *
from .node import *

BOOKS_API = "https://www.googleapis.com/books/v1/volumes?q={0}&key={1}"


class RegisterBook(graphene.Mutation):
    class Arguments:
        input = BookInputType(required=True)

    info = Field(UserBookNode)

    @login_required
    def mutate(self, info, **data):
        book = Book.objects.filter((Q(title=data['input'].get('title')) & Q(author=data['input'].get('author'))) | Q(
            isbn=data['input'].get('isbn'))).first()

        if book is None:
            search = None
            # call api to get info
            if data['input'].get('isbn') is not None:
                search = 'isbn:' + data['input'].get('isbn')
            elif data['input'].get('title') is not None and data['author'].get('title') is not None:
                search = 'intitle:' + data['input'].get('title') + "&inauthor:" + data['input'].get('author')

            if search is None:
                raise Exception('Bad inputs.')

            response = requests.get(BOOKS_API.format(search, os.environ.get('SECRET_KEY')))
            if response.status_code == 200:
                info = response.json()
                queued = False  # depends on the api
                title = data['input'].get('title')
                author = data['input'].get('author')
                isbn = data['input'].get('isbn')
                book = Book(title=title, author=author, isbn=isbn, info=info, queued=queued)
                book.save()
            elif response.status_code == 403:
                info = '{}'
                queued = True  # depends on the api
                title = data['input'].get('title')
                author = data['input'].get('author')
                isbn = data['input'].get('isbn')
                book = Book(title=title, author=author, isbn=isbn, info=info, queued=queued)
                book.save()
            else:
                raise Exception('Api call failed')

        owner = info.context.user
        status = 0
        buyer = None
        price = data['input'].get('price')
        description = data['input'].get('description')
        user_book = UserBook(book=book, owner=owner, status=status, buyer=buyer, price=price, description=description)

        wishlists = WishList.objects.filter(book__id__exact=book.id, price__lte=user_book.price)
        notifications = []
        for wishlist in wishlists:
            notification = Notifications(user=wishlist.user, subject='A book that you want just became available',
                                        message='xxx book is now at or under xxx', is_read=False)
            notifications.append(notification)

        user_book.save()
        Notifications.objects.bulk_create(notifications)
        return RegisterBook(info=user_book)


class EditBook(graphene.Mutation):
    class Arguments:
        input = EditInputType(required=True)

    success = Boolean()

    @login_required
    def mutate(self, info, **data):
        user_book = UserBook.objects.get(pk=data['input'].get('id'))
        if not user_book:
            raise Exception('Book not found')

        if info.context.user.id != user_book.owner.id:
            raise Exception('No access to book.')

        if data['input'].get('price') is not None:
            user_book.price = data['input'].get('price')

        if data['input'].get('description') is not None:
            user_book.description = data['input'].get('description')

        wishlists = WishList.objects.filter(book__id__exact=user_book.book.id, price__lte=user_book.price)
        notifications = []
        for wishlist in wishlists:
            notification = Notifications(user=wishlist.user, subject='A book that you want just became available',
                                         message='xxx book is now at or under xxx', is_read=False)
            notifications.append(notification)

        user_book.save()
        Notifications.objects.bulk_create(notifications)

        return EditBook(success=True)


class BuyBook(graphene.Mutation):
    class Arguments:
        id = ID()

    info = Field(UserBookNode)

    @login_required
    def mutate(self, info, **data):
        user_book = UserBook.objects.get(pk=data.get('id'))
        if not user_book:
            raise Exception('Book not found')

        if info.context.user.id == user_book.owner.id:
            raise Exception('User cant buy own book.')

        if user_book.buyer is not None:
            raise Exception('Someone already bought the book.')

        user_book.status = 1
        user_book.buyer = info.context.user
        user_book.save()

        wish = WishList.objects.filter(book__id__exact=user_book.book.id).first()
        if wish is not None:
            wish.wish_true = True
            wish.save()

        return BuyBook(info=user_book)


class RefundBook(graphene.Mutation):
    class Arguments:
        id = ID()

    info = Field(UserBookNode)

    @login_required
    def mutate(self, info, **data):
        user_book = UserBook.objects.get(pk=data.get('id'))
        if not user_book:
            raise Exception('Cant refund book')

        if info.context.user.id != user_book.buyer.id:
            raise Exception('User is not buyer of the book.')

        user_book.status = 0
        user_book.buyer = None

        wishlists = WishList.objects.filter(book__id__exact=user_book.book.id, price__lte=user_book.price)
        notifications = []
        for wishlist in wishlists:
            notification = Notifications(user=wishlist.user, subject='A book that you want just became available',
                                         message='xxx book is now at or under xxx', is_read=False)
            notifications.append(notification)

        user_book.save()
        Notifications.objects.bulk_create(notifications)

        wish = WishList.objects.filter(book__id__exact=user_book.book.id).first()
        if wish is not None:
            wish.wish_true = False
            wish.save()

        return RefundBook(info=user_book)


class DeleteBook(graphene.Mutation):
    class Arguments:
        id = ID()

    success = Boolean()

    @login_required
    def mutate(self, info, **data):
        book = UserBook.objects.get(pk=data.get('id'))
        if not book:
            raise Exception('Book is already deleted')

        if info.context.user.id != book.owner.id:
            raise Exception('Book is not owners book')

        book.delete()
        return DeleteBook(success=True)


class WishlistBook(graphene.Mutation):
    class Arguments:
        input = WishListInputType(required=True)

    success = Boolean()

    @login_required
    def mutate(self, info, **data):
        book = Book.objects.filter(isbn=data['input'].get('isbn')).first()
        if book is None:
            raise Exception('Book does not exist.')

        w = WishList.objects.filter(book__id__exact=book.id, user__id__exact=info.context.user.id).first()
        if w is not None:
            raise Exception('Book is already wish listed.')

        selling = UserBook.objects.filter(book__id__exact=book.id, owner__id__exact=info.context.user.id).first()
        if selling is not None:
            raise Exception('User is selling the book.')

        wishlist = WishList(book=book, user=info.context.user, price=data['input'].get('price'))
        wishlist.save()

        return WishlistBook(success=True)


class DeleteWishList(graphene.Mutation):
    class Arguments:
        id = ID()

    success = Boolean()

    @login_required
    def mutate(self, info, **data):
        wish = WishList.objects.get(pk=data.get('id'))
        if not wish:
            raise Exception('Wish does not exist.')

        if info.context.user.id != wish.user.id:
            raise Exception('User did not make the wish')

        wish.delete()
        return DeleteWishList(success=True)


class AddNotification(graphene.Mutation):
    class Arguments:
        input = NotificationInputType(required=True)

    info = Field(NotificationNode)

    @login_required
    def mutate(self, info, **data):
        notification = Notifications(user=info.context.user, subject=data['input'].get('subject'),message=data['input'].get('message'),is_read=False)
        notification.save()
        return AddNotification(notification)


class DeleteNotification(graphene.Mutation):
    class Arguments:
        id = ID()

    success = Boolean()

    @login_required
    def mutate(self, info, **data):
        notification = Notifications.objects.get(pk=data.get('id'))
        if not notification:
            raise Exception('Notification does not exist.')

        if info.context.user.id != notification.user.id:
            raise Exception('User does not own notification')

        notification.delete()
        return DeleteNotification(success=True)


class ReadNotification(graphene.Mutation):
    class Arguments:
        id = ID()

    success = Boolean()

    @login_required
    def mutate(self, info, **data):
        notification = Notifications.objects.get(pk=data.get('id'))
        if not notification:
            raise Exception('Notification does not exist.')

        if info.context.user.id != notification.user.id:
            raise Exception('User does not own notification')

        notification.is_read = True
        notification.save()
        return ReadNotification(success=True)


class DeleteAllNotification(graphene.Mutation):
    success = Boolean()

    @login_required
    def mutate(self, info, **data):
        Notifications.objects.filter(user=info.context.user).delete()
        return DeleteAllNotification(success=True)
