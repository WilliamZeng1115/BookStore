import axios from 'axios';

import { GRAPHQL_URI } from '../urls'
import { GET_USER_BOOKS, GET_BOOKS_FROM_USER_SELLING, GET_BOOKS_FROM_USER_BUYING, GET_BUYER_OF_BOOK} from '../query'
import { REGISTER_BOOK, EDIT_BOOK, BUY_BOOK, REFUND_BOOK, DELETE_USER_BOOK } from '../mutation'
import { USER_BOOKS_LOADED, USER_BOOKS_ERROR, BOOK_REGISTERED, REGISTER_ERROR, BOOK_UPDATED, UPDATE_ERROR } from '../types';

import { tokenConfig } from "./auth";

export const loadUserBooks = (id, type) => (dispatch, getState) => {
    const body = {
        query: GET_USER_BOOKS
    };

    if(type === "Selling") {
        body['query'] = GET_BOOKS_FROM_USER_SELLING;
        body['variables'].id = id;
    } else if(type === "Buying") {
        body['query'] = GET_BOOKS_FROM_USER_BUYING;
        body['variables'].id = id;
    } else if(type === "BookBuyer") {
        body['query'] = GET_BUYER_OF_BOOK;
        body['variables'].id = id;
    }

    axios.post(GRAPHQL_URI, body, tokenConfig(getState)).then(res => {
        if(res.data.errors != null) {
            dispatch({
                type: USER_BOOKS_ERROR
            });
        } else {
            dispatch({
                type: USER_BOOKS_LOADED,
                payload: res.data.data.userBooks
            });
        }
    }).catch(e => {
        dispatch({
            type: USER_BOOKS_ERROR
        });
    });
};

export const registerBook = (title, author, isbn, price, description) => (dispatch, getState) => {
    const body = {
        query: REGISTER_BOOK,
        variables: {
            title: title,
            author: author,
            isbn: isbn,
            price: price,
            description: description
        }
    };

    axios.post(GRAPHQL_URI, body, tokenConfig(getState)).then(res => {
        if(res.data.errors != null) {
            dispatch({
                type: REGISTER_ERROR
            });
        } else {
            dispatch({
                type: BOOK_REGISTERED,
                payload: res.data.data.info
            });
        }
    }).catch(e => {
        dispatch({
            type: REGISTER_ERROR
        });
    });
};

export const editBook = (id, price, description) => (dispatch, getState) => {
    const body = {
        query: EDIT_BOOK,
        variables: {
            id: id,
            price: price,
            description: description
        }
    };

    axios.post(GRAPHQL_URI, body, tokenConfig(getState)).then(res => {
        if(res.data.errors != null) {
            dispatch({
                type: UPDATE_ERROR
            });
        } else {
            dispatch({
                type: BOOK_UPDATED,
                payload: res.data.data.info
            });
        }
    }).catch(e => {
        dispatch({
            type: UPDATE_ERROR
        });
    });
};

export const bookAction = (id, action) => (dispatch, getState) => {
    const body = {
        variables: {
            id: id
        }
    };

    if(action === "Buy") body['query'] = BUY_BOOK;
    else if(action === "Refund") body['query'] = REFUND_BOOK;
    else if(action === "Delete") body['query'] = DELETE_USER_BOOK;

    axios.post(GRAPHQL_URI, body, tokenConfig(getState)).then(res => {
        if(res.data.errors != null) {
            dispatch({
                type: UPDATE_ERROR
            });
        } else {
            dispatch({
                type: BOOK_UPDATED,
                payload: res.data.data.info
            });
        }
    }).catch(e => {
        dispatch({
            type: UPDATE_ERROR
        });
    });
};

