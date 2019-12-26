export const REGISTER_BOOK = `
  mutation($title: String!, $author: String!, $isbn: String!, $price: Float!, $description: String!) {
    registerBook(input: {
      title: $title,
      author: $author,
      isbn: $isbn,
      price: $price,
      description: $description
    }) {
        info {
          id
         book {
            title
            author
            isbn
            info
          }
          owner {
            id
            username
            email
          }
          status
          price
          buyer {
            id
            username
          }
          description
          createdAt
        }
      }
  }`

export const EDIT_BOOK = `
  mutation($id: ID!, $price: Float!, $description: String!) {
    editBook(input: {
      id: $id,
      price: $price,
      description: $description
    }) {
      success
    }
  }`

export const BUY_BOOK = `
  mutation($id: ID!) {
    editBook(id: $id) {
        info {
          id
          book {
            id
            title
            author
            isbn
          }
          owner {
            id
            username
            email
          }
          status
          description
          price
          createdAt
        }
      }
  }`

export const REFUND_BOOK = `
  mutation($id: ID!) {
    refundBook(id: $id) {
        info {
          id
          book {
            id
            title
            author
            isbn
          }
          owner {
            id
            username
            email
          }
          status
          description
          price
          createdAt
        }
      }
  }`

export const DELETE_USER_BOOK = `
  mutation($id: ID!) {
    deleteBook(id: $id) {
      success
    }
  }`

export const WISHLIST_BOOK = `
  mutation($isbn: String!, $price: Float!) {
    wishlistBook(input: {
      isbn: $isbn,
      price: $price
    }) {
      success
    }
  }`

export const DELETE_WISHLIST = `
  mutation($id: ID!) {
    deleteWishlist(id: $id) {
      success
    }
  }`

export const ADD_NOTIFICATIONS = `
  mutation($subject: String!, $message: String!) {
    addNotification(input: {
      subject: $subject,
      message: $message
    }) {
        info {
          user {
            id
            username
            email
          }
          subject
          message
        }
      }
  }`

 export const READ_NOTIFICATION = `
  mutation($id: ID!) {
    readNotification(id: $id) {
      success
    }
  }`

  export const DELETE_NOTIFICATION = `
   mutation($id: ID!) {
    deleteNotification(id: $id) {
      success
    }
  }`

 export const DELETE_ALL_NOTIFICATION = `
   mutation {
    deleteAllNotification {
      success
    }
  }`

export const CREATE_USER = `
  mutation($username: String!, $email: String!, $password: String!, $firstName: String!, $lastName: String!) {
    userCreate(input: {
      username: $username,
      email: $email,
      password: $password,
      firstName: $firstName,
      lastName: $lastName
    }) {
      user {
        id
        username
        email
      }
    }
  }`

export const LOGIN_IN = `
  mutation($username: String!, $password: String!) {
    tokenAuth(username:$username, password: $password) {
      token
    }
  }`