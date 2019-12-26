import graphene
import graphql_jwt
from backend.schema import Query as gamble_query
from backend.schema import Mutation as gamble_mutation
from User.schema import Query as user_query
from User.schema import Mutation as user_mutation

class Query(gamble_query,user_query):
    pass

class Mutation(gamble_mutation,user_mutation, graphene.ObjectType):
    token_auth = graphql_jwt.ObtainJSONWebToken.Field()
    verify_token = graphql_jwt.Verify.Field()
    refresh_token = graphql_jwt.Refresh.Field()
    pass

schema = graphene.Schema(query=Query, mutation=Mutation)
