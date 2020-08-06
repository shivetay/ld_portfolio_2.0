import axios from 'axios';

/* action name creator */
const reducerName = 'project';
const createActionName = (name) => `app/${reducerName}/${name}`;

/* action types */

export const PROJECT_CREATE_SUCCESS = createActionName(
  'PROJECT_CREATE_SUCCESS'
);
export const PROJECT_CREATE_FAILED = createActionName('PROJECT_CREATE_FAILED');
export const PROJECT_UPDATE_FAILED = createActionName('PROJECT_UPDATE_FAILED');
export const PROJECT_UPDATE_SUCCESS = createActionName(
  'PROJECT_UPDATE_SUCCESS'
);

/* initial state */
const initialState = {
  //store token in localstorage
  loading: true,
  project: null,
};

/* reducer */
export default function reducer(state = initialState, action) {
  switch (action.type) {
    default:
      return state;
  }
}
