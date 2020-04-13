import {applyMiddleware, combineReducers, compose, createStore} from "redux";
import {createBrowserHistory} from "history";
import{connectRouter, routerMiddleware} from "connected-react-router";
import thunkMiddleware from 'redux-thunk';

import usersReducer from "./reducers/usersReducer";
import postsReducer from "./reducers/postsReducer";
import {loadFromLocalStorage, localStorageMiddleware} from "./localStorage";

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export const history = createBrowserHistory();

const rootReducer = combineReducers({
  router: connectRouter(history),
  users: usersReducer,
  posts: postsReducer,
});

const middleware = [
  thunkMiddleware,
  localStorageMiddleware,
  routerMiddleware(history)
];

const enhancers = composeEnhancers(applyMiddleware(...middleware));

const persistedState = loadFromLocalStorage();

const store = createStore(rootReducer, persistedState, enhancers);

export default store;