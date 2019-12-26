from graphene import Argument, Field, ID, ObjectType, Schema
from graphene import Node
import graphene
from graphene_django.filter import DjangoFilterConnectionField
from django.contrib.auth.models import User
from .graphql.user.types import UserType
from .graphql.user.filter import UserFilter
from .graphql.user.mutations import UserCreate


class Query(ObjectType):
    users = DjangoFilterConnectionField(UserType, filterset_class=UserFilter)
    user = graphene.Field(UserType)

    def resolve_users(self, info):
        return User.objects.all()

    def resolve_user(self, info):
        user = info.context.user
        if user is None or user.is_anonymous:
            raise Exception('Not logged in')
        return user


class Mutation(ObjectType):
    user_create = UserCreate.Field()
