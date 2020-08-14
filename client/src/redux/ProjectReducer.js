import axios from 'axios';

import { isAuthUser, authenticateUser } from '../utils/utils';

import { API_URL } from '../config';
import { setAlert } from './AlertReducer';

/* action name creator */
const reducerName = 'project';
const createActionName = (name) => `app/${reducerName}/${name}`;

/* action types */
export const GET_PROJECT = createActionName('GET_PROJECT');
export const GET_PROJECTS = createActionName('GET_PROJECTS');
export const GET_PROJECTS_FAILED = createActionName('GET_PROJECTS_FAILED');
export const CREATE_PROJECT = createActionName('CREATE_PROJECT');
export const CREATE_SUCCESS = createActionName('CREATE_SUCCESS');
export const CREATE_FAILED = createActionName('CREATE_FAILED');
export const UPDATE_PROJECT = createActionName('UPDATE_PROJECT');
export const UPDATE_SUCCESS = createActionName('UPDATE_SUCCESS');
export const DELETE_PROJECT = createActionName('DELETE_PROJECT');
export const DELETE_FAILED = createActionName('DELETE_FAILED');

/* action creators */

export const getOneProejctAction = (payload) => ({
  payload,
  type: GET_PROJECT,
});

export const getAllProjectsAction = (payload) => ({
  payload,
  type: GET_PROJECTS,
});
export const getAllProjectsFailedAction = (payload) => ({
  payload,
  type: GET_PROJECTS_FAILED,
});
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
export const projectDeleteAction = (payload) => ({
  payload,
  type: DELETE_PROJECT,
});
export const projectDeleteFailed = (payload) => ({
  payload,
  type: DELETE_FAILED,
});

/* action THUNKs*/

//get one prject
export const getProject = (id) => {
  return async (dispatch) => {
    try {
      const res = await axios(`${API_URL}/projects/${id}`);
      dispatch(getOneProejctAction(res.data));
    } catch (err) {}
  };
};

//get all projects
export const getAllProjects = (page) => {
  return async (dispatch) => {
    try {
      const res = await axios.get(`${API_URL}/projects/?page=${page}`);
      dispatch(getAllProjectsAction(res.data));
    } catch (err) {
      dispatch(getAllProjectsFailedAction({ name: 'GET_PROJECTS_FAILED' }));
    }
  };
};

//create new project

export const createNewProject = (formData, history, id) => {
  return async (dispatch) => {
    const config = {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'multipart/form-data',
        Authorization: isAuthUser(),
      },
    };
    try {
      const res = await axios.post(
        `${API_URL}/projects/create/${id}`,
        formData,
        config
      );
      dispatch(createProjectAction(res.data));
      history.push('/admin/dashboard');
      dispatch(createSuccess({ name: CREATE_SUCCESS }));
    } catch (err) {
      console.log('reducer error');
      dispatch(createProjectActionFailed({ name: 'CREATE_FAILED' }));
    }
  };
};

// delete project
export const deleteProject = (id) => {
  return async (dispatch) => {
    const config = {
      headers: {
        Authorization: isAuthUser(),
      },
    };
    try {
      const res = await axios.delete(
        `${API_URL}/projects/delete/${id}`,
        config
      );
      dispatch(projectDeleteAction(res.data));
      dispatch(getAllProjects());
    } catch (err) {
      dispatch(projectDeleteFailed({ name: 'DELETE_FAILED' }));
    }
  };
};

/* initial state */
const initialState = {
  loading: true,
  project: null,
  projects: [],
};

/* reducer */
export default function reducer(state = initialState, action) {
  switch (action.type) {
    case GET_PROJECT:
      return {
        ...state,
        loading: false,
        project: action.payload,
      };
    case GET_PROJECTS:
      return {
        ...state,
        loading: false,
        projects: action.payload,
      };

    case CREATE_PROJECT:
      return {
        ...state,
        loading: false,
        project: action.payload,
      };
    case CREATE_FAILED:
    case DELETE_PROJECT:
      return {
        ...state,
        loading: true,
        project: null,
      };
    case GET_PROJECTS_FAILED:
      return {
        ...state,
        loading: true,
        projects: [],
      };
    default:
      return state;
  }
}
