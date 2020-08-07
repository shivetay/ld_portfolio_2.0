import axios from 'axios';

import { isAuthUser, authenticateUser } from '../utils/utils';

import { API_URL } from '../config';
import { setAlert } from './AlertReducer';

/* action name creator */
const reducerName = 'project';
const createActionName = (name) => `app/${reducerName}/${name}`;

/* action types */

export const CREATE_PROJECT = createActionName('CREATE_PROJECT');
export const CREATE_SUCCESS = createActionName('CREATE_SUCCESS');
export const CREATE_FAILED = createActionName('CREATE_FAILED');
export const UPDATE_PROJECT = createActionName('UPDATE_PROJECT');
export const PROJECT_UPDATE_SUCCESS = createActionName(
  'PROJECT_UPDATE_SUCCESS'
);

/* action creators */

export const createProjectAction = (payload) => ({
  payload,
  type: CREATE_PROJECT,
});
export const createProjectActionFailed = (payload) => ({
  payload,
  type: CREATE_FAILED,
});
export const createSuccess = (payload) => ({
  payload,
  type: CREATE_SUCCESS,
});

/* action THUNKs*/
//create new project
export const createNewProject = (formData, history) => {
  return async (dispatch) => {
    try {
      const config = {
        headers: {
          Accept: 'application/json',
          'Content-Type': 'multipart/form-data',
          Authorization: isAuthUser(),
        },
      };
      const res = await axios.post(
        `${API_URL}/projects/create/${this.props.match.params.userId}`,
        formData,
        config
      );
      // authenticateUser(res.data.token);
      dispatch(createProjectAction(res.data));
      dispatch(createSuccess({ name: 'CREATE_SUCCESS' }));
      history.push('/admin/dashboard');
    } catch (err) {
      console.log('err');
      dispatch(createProjectActionFailed({ name: 'CREATE_FAILED' }));
    }
  };
};

/* initial state */
const initialState = {
  //store token in localstorage
  loading: true,
  project: null,
  projects: [],
};

/* reducer */
export default function reducer(state = initialState, action) {
  switch (action.type) {
    case CREATE_PROJECT:
      return {
        ...state,
        loading: false,
        project: action.payload,
      };
    default:
      return state;
  }
}
