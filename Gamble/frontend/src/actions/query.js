export const GET_BOOKS = `{
  allBooks {
    edges {
      node {
        id
        title
        author
        isbn
        info
      }
    }
  }
}`

export const GET_BOOKS_FILTER = `
    query GetAllBooks($num: Int!, $after: String!) {
        allBooks(first: $num, after: $after) {
            edges {
              node {
                id
                title
                author
                isbn
                info
              }
            }
        }
    }`

export const GET_BOOKS_FILTER_ID = `
    query GetAllBooks($id: ID!) {
        allBooks(id: $id) {
            edges {
              node {
                id
                title
                author
                isbn
                info
              }
            }
        }
    }`

export const GET_USER_BOOKS = `{
  userBooks {
    edges {
      node {
         book {
            title
            author
            isbn
            info
          }
          description
          owner {
            username
            email
          }
          status
          buyer {
            username
            email
          }
          price
          createdAt
      }
    }
  }
}`

export const GET_WISHLIST = `{
  allWishlists {
    edges {
      node {
        book {
        title
        author
        isbn
        info
        }
        user {
         username
         email
        }
        price
        wishTrue
        createdAt
      }
    }
  }
}`

export const GET_NOTIFICATIONS = `{
  allNotifications {
    edges {
      node {
        user {
        id
        username
        email
        }
    	subject
        message
        isRead
        createdAt
      }
    }
  }
}`

export const GET_BOOKS_FROM_USER_SELLING = `
    query GetBooksFromUser($id: ID!) {
        userBooks(owner: $id) {
            edges {
              node {
                book {
                title
                author
                isbn
                info
              }
              description
              status
              buyer {
                id
                username
                email
              }
              price
              createdAt
              }
            }
        }
    }`

export const GET_BOOKS_FROM_USER_BUYING = `
    query GetBooksFromUser($id: ID!) {
        userBooks(buyer: $id) {
            edges {
              node {
                book {
                title
                author
                isbn
                info
              }
              description
              status
              owner {
                id
                username
                email
              }
              price
              createdAt
              }
            }
        }
    }`

export const GET_WISH_MADE_BY_USER = `
    query GetWishMadeByUser($id: ID!) {
        allWishlists(user: $id) {
            edges {
              node {
                book {
                 id
                 title
                 author
                 isbn
                 info
                }
                 price
                 wishTrue
                 createdAt
              }
            }
        }
    }`

export const GET_WISH_MADE_ON_BOOK = `
    query GetWishMadeOnBook($id: ID!) {
        allWishlists(book: $id) {
            edges {
              node {
                user {
                 id
                 username
                  email
                }
                price
                wishTrue
                createdAt
              }
            }
        }
    }`

 export const GET_USER_NOTIFICATIONS = `
    query GetUserNotifications($id: ID!) {
        allNotifications(user: $id) {
            edges {
              node {
                subject
                message
                isRead
                createdAt
              }
            }
        }
    }`

  export const GET_BOOK_SOLD_PER_BOOK_COUNT = `{
        allBooks {
            edges {
              node {
                selling {
                    totalCount
                }
              }
            }
        }
    }`

   export const GET_BOOK_SOLD_PER_USER_COUNT = `{
        users {
            edges {
                node {
                    owner {
                     totalCount
                    }
                }
            }
        }
    }`


    export const GET_BOOK_BOUGHT_PER_USER_COUNT = `{
        users {
            edges {
                node {
                    buyer {
                      totalCount
                    }
                }
            }
        }
    }`

    export const GET_BOOK_BOUGHT_PER_USER = `{
        users {
            edges {
                node {
                  buyer {
                    edges {
                      node {
                        book {
                          title
                          author
                          isbn
                          info
                        }
                      }
                    }
                 }
               }
             }
           }
        }`

 export const GET_BOOK_SOLD_PER_USER = `{
        users {
            edges {
                node {
                  owner {
                    edges {
                      node {
                        book {
                          title
                          author
                          isbn
                          info
                        }
                      }
                    }
                 }
               }
             }
           }
        }`

 export const GET_BUYER_OF_BOOK = `
    query GetBuyerOfBook($id: ID!) {
        userBook(id: $id) {
            buyer {
                id
                username
                email
            }
        }
    }`

 export const GET_WISH_COUNT_PER_USER = `{
        users {
          edges {
            node {
              wish {
                totalCount
              }
            }
          }
        }
      }`

 export const GET_WISH_COUNT_PER_BOOK = `{
         allBooks {
            edges {
            node {
              wished {
                totalCount
              }
            }
          }
         }
      }`

export const GET_USER = `{
  user {
    id
    username
    email
  }
}`
