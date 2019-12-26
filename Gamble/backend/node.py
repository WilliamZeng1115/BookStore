import graphene
from graphene import relay, ObjectType
from graphene_django import DjangoObjectType

from .connections import *
from .models import *


class BookNode(DjangoObjectType):
    mid = graphene.Int(source='pk')

    class Meta:
        model = Book
        interfaces = (relay.Node,)
        connection_class = ExtendedConnection


class UserBookNode(DjangoObjectType):
    mid = graphene.Int(source='pk')

    class Meta:
        model = UserBook
        interfaces = (relay.Node,)
        connection_class = ExtendedConnection


class WishNode(DjangoObjectType):
    mid = graphene.Int(source='pk')

    class Meta:
        model = WishList
        interfaces = (relay.Node,)
        connection_class = ExtendedConnection


class NotificationNode(DjangoObjectType):
    mid = graphene.Int(source='pk')

    class Meta:
        model = Notifications
        interfaces = (relay.Node,)
        connection_class = ExtendedConnection
