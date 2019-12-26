import { GET_ERRORS } from '../types';

export const getErrors = (msg, status) => dispatch => {
  return {
    type: GET_ERRORS,
    payload: { msg, status }
  };
}
