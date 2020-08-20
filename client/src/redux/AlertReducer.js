import { v4 as uuidv4 } from 'uuid';

/* action name creator */
const reducerName = 'alerts';
const createActionName = (name) => `app/${reducerName}/${name}`;

/* action types */
export const SET_ALERT = createActionName('SET_ALERT');
export const REMOVE_ALERT = createActionName('REMOVE_ALERT');

/* action creators */
export const setAlertAction = (payload) => ({ payload, type: SET_ALERT });
export const removeAlertAction = (payload) => ({ payload, type: REMOVE_ALERT });

/* actions THUNK */
export const setAlert = (msg, alertType) => {
  return (dispatch) => {
    const id = uuidv4();
    dispatch(setAlertAction({ msg, alertType, id, name: 'SET_ALERT' }));
    setTimeout(
      () => dispatch(removeAlertAction({ id, name: 'REMOVE_ALERT' })),
      5000
    );
  };
};

/* initial state */
const initialState = [];

/* reducer */
export default function reducer(state = initialState, action) {
  switch (action.type) {
    case SET_ALERT:
      return [...state, action.payload];
    case REMOVE_ALERT:
      return state.filter((alert) => alert.id !== action.payload.id);
    default:
      return state;
  }
}
