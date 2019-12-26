from graphene_django.filter import DjangoFilterConnectionField

from .filter import *
from .mutation import *
from .models import *


class Query(ObjectType):
    book = relay.Node.Field(BookNode)
    all_books = DjangoFilterConnectionField(BookNode, filterset_class=BookFilter)

    user_book = relay.Node.Field(UserBookNode)
    user_books = DjangoFilterConnectionField(UserBookNode, filterset_class=UserBookFilter)

    wishlist = relay.Node.Field(WishNode)
    all_wishlists = DjangoFilterConnectionField(WishNode, filterset_class=WishListFilter)

    notification = relay.Node.Field(NotificationNode)
    all_notifications = DjangoFilterConnectionField(NotificationNode, filterset_class=NotificationFilter)

    def resolve_all_books(self, info, **kwargs):
        return Book.objects.all()

    def resolve_user_books(self, info, **kwargs):
        return UserBook.objects.all()

    @login_required
    def resolve_all_wishlists(self, info, **kwargs):
        return WishList.objects.all()

    @login_required
    def resolve_all_notifications(self, info, **kwargs):
        return Notifications.objects.all()


class Mutation(ObjectType):
    register_book = RegisterBook.Field()
    edit_book = EditBook.Field()
    buy_book = BuyBook.Field()
    refund_book = RefundBook.Field()
    delete_book = DeleteBook.Field()
    wishlist_book = WishlistBook.Field()
    delete_wishlist = DeleteWishList.Field()
    delete_notification = DeleteNotification.Field()
    delete_all_notification = DeleteAllNotification.Field()
    read_notification = ReadNotification.Field()
    add_notification = AddNotification.Field()
