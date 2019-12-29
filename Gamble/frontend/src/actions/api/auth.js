import axios from 'axios';
import { getErrors } from './message';

import { GRAPHQL_URI  } from '../urls'
import { GET_USER } from '../query'
import { CREATE_USER, LOGIN_IN } from '../mutation'
import { USER_LOADED, USER_LOADING, AUTH_ERROR, LOGIN_SUCCESS, LOGIN_FAIL, LOGOUT_SUCCESS, REGISTER_SUCCESS, REGISTER_FAIL } from '../types';

export const loadUser = () => (dispatch, getState) => {
  dispatch({ type: USER_LOADING });

  const body = {
    query: GET_USER
  };

  axios.post(GRAPHQL_URI, body, tokenConfig(getState)).then(res => {
    if(res.data.errors != null) {
      dispatch({
        type: AUTH_ERROR
      });
    } else {
      dispatch({
        type: USER_LOADED,
        payload: res.data.data.user
      });
    }
  }).catch(e => {
    //dispatch(getErrors(e.response.data, e.response.status));
    dispatch({
      type: AUTH_ERROR
    });
  });
}

export const loginUser = (username, password) => (dispatch) => {
  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  }

  const body = {
    query: LOGIN_IN,
    variables: {
      username: username,
      password: password
    }
  };

  console.log("logging in");
  axios.post(GRAPHQL_URI, body, config).then(res => {
    console.log(res.data);
    dispatch({
      type: LOGIN_SUCCESS,
      payload: res.data.data.tokenAuth.token
    });
  }).catch(e => {
    dispatch(getErrors(e.response.data, e.response.status));
    dispatch({
      type: LOGIN_FAIL
    });
  });
};

export const logoutUser = () => (dispatch) => {
  dispatch({
      type: LOGOUT_SUCCESS
  });
}

export const registerUser = ({ username, password, email, firstName, lastName }) => (dispatch) => new Promise(function(resolve, reject) {
  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  }

  const body = {
    query: CREATE_USER,
    variables: {
      username: username,
      email: email,
      password: password,
      firstName: firstName,
      lastName: lastName
    }
  };

  axios.post(GRAPHQL_URI, body, config).then(res => {
    console.log(res);
    dispatch({
      type: REGISTER_SUCCESS,
      payload: res.data.data.userCreate
    });
    resolve();
  }).catch(e => {
    dispatch(getErrors(e.response.data, e.response.status));
    dispatch({
      type: REGISTER_FAIL
    });
    reject();
  });
});

export const tokenConfig = getState => {
  const token = getState().auth.token;
  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  }

  if(token) {
    config.headers['Authorization'] = `JWT ${token}`;
  }
  return config;
}
