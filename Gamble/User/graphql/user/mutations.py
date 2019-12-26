from graphene import Field, InputObjectType, Mutation, String
from .types import UserType
from .serializers import RegisterSerializer


class UserRegisterInputType(InputObjectType):
    username = String()
    email = String()
    password = String()
    first_name = String()
    last_name = String()


class UserCreate(Mutation):
    class Arguments:
        input = UserRegisterInputType(required=True)

    user = Field(UserType)

    @classmethod
    def mutate(cls, root, info, **data):
        serializer = RegisterSerializer(data=data.get('input'))
        serializer.is_valid(raise_exception=True)
        user = serializer.save()
        return UserCreate(user=user)
