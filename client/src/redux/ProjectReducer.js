import axios from 'axios';

import { isAuthUser } from '../utils/utils';

import { API_URL } from '../config';
import { setAlert } from './AlertReducer';

/* action name creator */
const reducerName = 'project';
const createActionName = (name) => `app/${reducerName}/${name}`;

/* action types */
export const GET_PROJECT = createActionName('GET_PROJECT');
export const LOAD_SUCCESS = createActionName('LOAD_SUCCESS');
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

export const getOneProjectAction = (payload) => ({
  payload,
  type: GET_PROJECT,
});
export const loadSuccess = (payload) => ({
  payload,
  type: LOAD_SUCCESS,
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
      dispatch(getOneProjectAction(res.data));
      dispatch(loadSuccess({ name: 'LOAD_SUCCESS' }));
    } catch (err) {
      dispatch(getAllProjectsFailedAction({ name: 'GET_PROJECTS_FAILED' }));
    }
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
      dispatch(setAlert('Proejct created', 'success'));
      dispatch(createProjectAction(res.data));
      history.push('/admin/dashboard');
      dispatch(createSuccess({ name: CREATE_SUCCESS }));
    } catch (err) {
      dispatch(setAlert(err.message, 'danger'));
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
      dispatch(setAlert('Project deleted', 'success'));
      dispatch(projectDeleteAction(res.data));
      dispatch(getAllProjects());
    } catch (err) {
      dispatch(setAlert(err.message, 'danger'));
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
        loading: true,
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
    case LOAD_SUCCESS:
      return {
        ...state,
        loading: false,
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
