from django.contrib.auth.models import User
from graphene import relay
from graphene_django import DjangoObjectType

from User.connections import *


class UserType(DjangoObjectType):
    class Meta:
        model = User
        interfaces = (relay.Node,)
        use_connection = True
        connection_class = ExtendedConnection
