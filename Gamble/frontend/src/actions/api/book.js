import axios from 'axios';

import { GRAPHQL_URI } from '../urls'
import { GET_BOOKS, GET_BOOKS_FILTER_ID } from '../query'
import {BOOKS_LOADED, BOOKS_ERROR } from '../types';

import { tokenConfig } from "./auth";

export const loadBooks = (id) => (dispatch, getState) => {
    const body = {
        query: GET_BOOKS
    };

    if(id !== null) {
        body['variables'].id = id;
        body['query'] = GET_BOOKS_FILTER_ID;
    }

    axios.post(GRAPHQL_URI, body, tokenConfig(getState)).then(res => {
        if(res.data.errors != null) {
            dispatch({
                type: BOOKS_ERROR
            });
        } else {
            dispatch({
                type: BOOKS_LOADED,
                payload: res.data.data.allBooks
            });
        }
    }).catch(e => {
        dispatch({
            type: BOOKS_ERROR
        });
    });
};