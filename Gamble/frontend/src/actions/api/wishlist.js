import axios from 'axios';

import { GRAPHQL_URI } from '../urls'
import { GET_WISHLIST, GET_WISH_MADE_BY_USER, GET_WISH_MADE_ON_BOOK } from '../query'
import { WISHLIST_BOOK, DELETE_WISHLIST } from '../mutation'
import { WISHLIST_LOADED, WISHLIST_LOAD_ERROR, BOOK_WISHLISTED, BOOK_WISHLIST_ERROR, WISHLIST_DELETED, WISHLIST_DELETE_ERROR } from '../types';

import { tokenConfig } from "./auth";

export const loadWishList = (id, type) => (dispatch, getState) => {
    const body = {
        query: GET_WISHLIST
    };

    if(type === "Book") {
        body['query'] = GET_WISH_MADE_ON_BOOK;
        body['variables'].id = id;
    } else if(type === "User") {
        body['query'] = GET_WISH_MADE_BY_USER;
        body['variables'].id = id;
    }

    axios.post(GRAPHQL_URI, body, tokenConfig(getState)).then(res => {
        if(res.data.errors != null) {
            dispatch({
                type: WISHLIST_LOAD_ERROR
            });
        } else {
            dispatch({
                type: WISHLIST_LOADED,
                payload: res.data.data.allWishlists
            });
        }
    }).catch(e => {
        dispatch({
            type: WISHLIST_LOAD_ERROR
        });
    });
};

export const wishListBook = (isbn, price) => (dispatch, getState) => {
    const body = {
        query: WISHLIST_BOOK,
        variables: {
            isbn: isbn,
            price: price
        }
    };

    axios.post(GRAPHQL_URI, body, tokenConfig(getState)).then(res => {
        if(res.data.errors != null) {
            dispatch({
                type: BOOK_WISHLIST_ERROR
            });
        } else {
            dispatch({
                type: BOOK_WISHLISTED,
                payload: res.data.data.allWishlists
            });
        }
    }).catch(e => {
        dispatch({
            type: BOOK_WISHLIST_ERROR
        });
    });
};

export const deleteWishList = (id) => (dispatch, getState) => {
    const body = {
        query: DELETE_WISHLIST,
        variables: {
            id: id
        }
    };

    axios.post(GRAPHQL_URI, body, tokenConfig(getState)).then(res => {
        if(res.data.errors != null) {
            dispatch({
                type: WISHLIST_DELETE_ERROR
            });
        } else {
            dispatch({
                type: WISHLIST_DELETED,
                payload: res.data.data.allWishlists
            });
        }
    }).catch(e => {
        dispatch({
            type: WISHLIST_DELETE_ERROR
        });
    });
};