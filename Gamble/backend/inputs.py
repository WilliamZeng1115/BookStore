from graphene import ID, InputObjectType, String, Float


class BookInputType(InputObjectType):
    title = String()
    author = String()
    isbn = String()
    price = Float()
    description = String()


class EditInputType(InputObjectType):
    id = ID()
    price = Float()
    description = String()


class WishListInputType(InputObjectType):
    isbn = String()
    price = Float()


class NotificationInputType(InputObjectType):
    subject = String()
    message = String()