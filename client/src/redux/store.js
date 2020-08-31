import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import { composeWithDevTools } from 'redu-devtools-extension';
import thunk from 'redux-thunk';

import alerts from './AlertReducer';
import auth from './AuthReducer';
import project from './ProjectReducer';

// initial state
const initialState = {};

// define reducers
const reducers = {
  auth,
  alerts,
  project,
};

// add blank reducers for initial state properties without reducers
Object.keys(initialState).forEach((item) => {
  if (typeof reducers[item] == 'undefined') {
    reducers[item] = (statePart = null) => statePart;
  }
});

// combine reducers
const combinedReducers = combineReducers(reducers);

//create store
const store = createStore(
  combinedReducers,
  initialState,
  composeWithDevTools(applyMiddleware(thunk))
  // compose(
  //   applyMiddleware(thunk),
  //   window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  // )
);

export default store;
