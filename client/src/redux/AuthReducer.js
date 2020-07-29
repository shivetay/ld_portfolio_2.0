import axios from 'axios';

import { authenticateUser, isAuthUser, authHeader } from '../utils/utils';

import { API_URL } from '../config';
import { setAlert } from './AlertReducer';

/* action name creator */
const reducerName = 'auth';
const createActionName = (name) => `app/${reducerName}/${name}`;

/* action types */
export const AUTH_ERROR = createActionName('AUTH_ERROR');
export const USER_LOADED = createActionName('USER_LOADED');
export const LOGIN_SUCCESS = createActionName('LOGIN_SUCCESS');
export const LOGIN_FAIL = createActionName('LOGIN_FAIL');

/* action creators */

export const loginSuccesAction = (payload) => ({
  payload,
  type: LOGIN_SUCCESS,
});
export const loginFailAction = (payload) => ({
  payload,
  type: LOGIN_FAIL,
});
export const userAuthError = (payload) => ({
  payload,
  type: AUTH_ERROR,
});
export const userLoadSuccess = (payload) => ({
  payload,
  type: USER_LOADED,
});

/* action THUNKs*/

//load user
export const loadUser = () => {
  return async (dispatch) => {
    if (localStorage.jwt) {
      authHeader(localStorage.jwt);
    }
    try {
      const res = await axios.get(`${API_URL}/users/me`);
      console.log(userLoadSuccess(res.data));
      dispatch(userLoadSuccess(res.data));
    } catch (err) {
      dispatch(userAuthError({ name: 'AUTH_ERROR' }));
    }
  };
};

export const loginUser = (user) => {
  return async (dispatch) => {
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };
    // const user = JSON.stringify({ email, password });
    console.log(user);
    try {
      const res = await axios.post(`${API_URL}/login`, user, config);
      console.log('res.data', res.data);
      authenticateUser(res.data.token);
      dispatch(loginSuccesAction(res.data));
      localStorage.setItem('user', JSON.stringify(res.data.user));
      console.log(loadUser());
      // dispatch(loadUser());
    } catch (err) {
      // const errors = err.response.data.errors;
      // if (errors) {
      //   errors.forEach((error) => dispatch(setAlert(error.msg, 'danger')));
      // }
      dispatch(loginFailAction({ name: 'LOGIN_FAIL' }));
      console.log(err);
    }
  };
};

/* initial state */

const initialState = {
  //store token in localstorage
  token: localStorage.getItem('jwt'),
  isAuthenticated: null,
  loading: true,
  user: null,
};

/* reducer */

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case LOGIN_SUCCESS:
      return {
        ...state,
        ...action.payload,
        isAuthenticated: true,
        loading: false,
      };
    case AUTH_ERROR:
    case LOGIN_FAIL:
      localStorage.removeItem('jwt');
      return {
        ...state,
        token: null,
        isAuthenticated: null,
        loading: false,
        user: null,
      };
    //user loading
    case USER_LOADED:
      return {
        ...state,
        isAuthenticated: true,
        loading: false,
        user: action.payload,
      };
    default:
      return state;
  }
}
