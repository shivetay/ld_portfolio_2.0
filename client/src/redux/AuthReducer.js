import axios from 'axios';

import { authenticateUser, isAuthUser } from '../utils/utils';

import { API_URL } from '../config';
import { setAlert } from './AlertReducer';

/* action name creator */
const reducerName = 'auth';
const createActionName = (name) => `app/${reducerName}/${name}`;

/* action types */
export const AUTH_ERROR = createActionName('AUTH_ERROR');
export const ERROR_PROFILE = createActionName('ERROR_PROFILE');
export const USER_LOADED = createActionName('USER_LOADED');
export const LOGIN_SUCCESS = createActionName('LOGIN_SUCCESS');
export const LOGIN_FAIL = createActionName('LOGIN_FAIL');
export const LOGOUT = createActionName('LOGOUT');

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
export const getProfileError = (payload) => ({
  payload,
  type: ERROR_PROFILE,
});
export const userLoadSuccess = (payload) => ({
  payload,
  type: USER_LOADED,
});
export const logoutAction = (payload) => ({
  payload,
  type: LOGOUT,
});

/* action THUNKs*/

//load user
export const loadUser = () => {
  return async (dispatch) => {
    let config;
    if (localStorage.getItem('jwt')) {
      config = {
        headers: {
          Authorization: isAuthUser(),
        },
      };
    }
    try {
      const res = await axios.get(`${API_URL}/users/me`, config);
      dispatch(userLoadSuccess(res.data));
    } catch (err) {
      dispatch(userAuthError({ name: 'AUTH_ERROR' }));
    }
  };
};

// login user
export const loginUser = (user) => {
  return async (dispatch) => {
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };
    try {
      const res = await axios.post(`${API_URL}/login`, user, config);
      authenticateUser(res.data.token);
      dispatch(loginSuccesAction(res.data));
      localStorage.setItem('user', JSON.stringify(res.data.user));
      dispatch(loadUser());
      dispatch(setAlert('User Loged in', 'success'));
    } catch (err) {
      dispatch(setAlert(err.msg));
      const errors = err.response.data.errors;
      if (errors) {
        errors.forEach((error) => dispatch(setAlert(error.msg, 'danger')));
      }
      dispatch(loginFailAction({ name: 'LOGIN_FAIL' }));
    }
  };
};

// logout & profile clear

export const logoutUser = () => {
  return async (dispatch) => {
    const config = {
      headers: {
        Authorization: isAuthUser(),
      },
    };
    console.log('logout header', config);
    try {
      await axios.post(`${API_URL}/logout`, config);
      dispatch(setAlert('User loged out', 'success'));
      dispatch(logoutAction({ name: 'LOGOUT' }));
    } catch (err) {
      // const errors = err.response.data.errors;
      if (err) {
        dispatch(setAlert(err.message, 'danger'));
      }
      // dispatch(
      //   getProfileError({
      //     msg: err.response.statusText,
      //     status: err.response.status,
      //   })
      // );
      console.log(err.message);
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
  error: {},
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
    case LOGOUT:
      localStorage.removeItem('jwt');
      localStorage.removeItem('user');
      return {
        ...state,
        token: null,
        isAuthenticated: null,
        loading: false,
        user: null,
      };
    case ERROR_PROFILE:
      return {
        ...state,
        error: action.payload,
        loading: false,
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
