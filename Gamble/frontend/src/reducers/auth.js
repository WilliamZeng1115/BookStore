import { USER_LOADING, USER_LOADED, AUTH_ERROR, LOGIN_SUCCESS, LOGIN_FAIL, LOGOUT_SUCCESS, LOGOUT_FAIL, REGISTER_SUCCESS, REGISTER_FAIL } from '../actions/types.js';
import Cookies from 'js-cookie'

const initialState = {
  token: Cookies.get('token'),
  isAuthenticated: null,
  isLoading: false,
  user: null
}

export default function(state = initialState, action) {
  switch(action.type) {
    case USER_LOADING:
      return {
        ...state,
        isLoading: true
      }
    case USER_LOADED:
      return {
        ...state,
        isAuthenticated: true,
        isLoading: false,
        user: action.payload
      }
    case AUTH_ERROR:
    case LOGIN_FAIL:
    case LOGOUT_SUCCESS:
    case REGISTER_FAIL:
      Cookies.remove('token');
      return {
        ...state,
        token: null,
        user: null,
        isAuthenticated: false,
        isLoading: false
      }
    case REGISTER_SUCCESS:
      return {
        ...state,
        user: action.payload.user,
        isAuthenticated: true,
        isLoading: false
      }
    case LOGIN_SUCCESS:
      Cookies.set('token', action.payload);
      return {
        ...state,
        token: action.payload,
        isAuthenticated: true,
        isLoading: false
      }
    case LOGOUT_FAIL:
    default:
      return state;
  }
}
