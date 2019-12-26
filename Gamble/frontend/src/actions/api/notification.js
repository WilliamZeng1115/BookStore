import axios from 'axios';

import { GRAPHQL_URI } from '../urls'
import { GET_NOTIFICATIONS, GET_USER_NOTIFICATIONS } from '../query'
import { ADD_NOTIFICATIONS, READ_NOTIFICATION, DELETE_NOTIFICATION, DELETE_ALL_NOTIFICATION } from '../mutation'
import { NOTIFICATIONS_LOADED, NOTIFICATIONS_LOAD_ERROR, NOTIFICATIONS_UPDATED, NOTIFICATIONS_UPDATE_ERROR } from '../types';

import { tokenConfig } from "./auth";

export const loadNotifications = (id) => (dispatch, getState) => {
    const body = {
        query: GET_NOTIFICATIONS
    };

    if(id !== null) {
        body['variables'].id = id;
        body['query'] = GET_USER_NOTIFICATIONS;
    }

    axios.post(GRAPHQL_URI, body, tokenConfig(getState)).then(res => {
        if(res.data.errors != null) {
            dispatch({
                type: NOTIFICATIONS_LOAD_ERROR
            });
        } else {
            dispatch({
                type: NOTIFICATIONS_LOADED,
                payload: res.data.data.userBooks
            });
        }
    }).catch(e => {
        dispatch({
            type: NOTIFICATIONS_LOAD_ERROR
        });
    });
};

export const updateNotifications = (id, type) => (dispatch, getState) => {
    const body = {
        variables: {
            id: id
        }
    };

    if(type === "Read") {
        body['query'] = READ_NOTIFICATION;
    } else if(type === "Delete") {
        body['query'] = DELETE_NOTIFICATION;
    } else if(type === "DeleteAll") {
        body['query'] = DELETE_ALL_NOTIFICATION;
    }

    axios.post(GRAPHQL_URI, body, tokenConfig(getState)).then(res => {
        if(res.data.errors != null) {
            dispatch({
                type: NOTIFICATIONS_UPDATE_ERROR
            });
        } else {
            dispatch({
                type: NOTIFICATIONS_UPDATED,
                payload: res.data.data.userBooks
            });
        }
    }).catch(e => {
        dispatch({
            type: NOTIFICATIONS_UPDATE_ERROR
        });
    });
};

export const addNotifications = (subject, message) => (dispatch, getState) => {
    const body = {
        query: ADD_NOTIFICATIONS,
        variables: {
            subject: subject,
            message: message
        }
    };

    axios.post(GRAPHQL_URI, body, tokenConfig(getState)).then(res => {
        if(res.data.errors != null) {
            dispatch({
                type: NOTIFICATIONS_UPDATE_ERROR
            });
        } else {
            dispatch({
                type: NOTIFICATIONS_UPDATED,
                payload: res.data.data.userBooks
            });
        }
    }).catch(e => {
        dispatch({
            type: NOTIFICATIONS_UPDATE_ERROR
        });
    });
};