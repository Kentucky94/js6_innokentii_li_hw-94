import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from "react-redux";
import {ConnectedRouter} from "connected-react-router";

import App from './App';
import * as serviceWorker from './serviceWorker';
import {applyMiddleware, combineReducers, compose, createStore} from "redux";
import usersReducer from "./store/reducers/usersReducer";
import postsReducer from "./store/reducers/postsReducer";
import {connectRouter, routerMiddleware} from "connected-react-router";
import {createBrowserHistory} from "history";
import thunkMiddleware from 'redux-thunk';
import {loadFromLocalStorage, localStorageMiddleware} from "./store/localStorage";

const history = createBrowserHistory();

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const rootReducer = combineReducers({
  router: connectRouter(history),
  users: usersReducer,
  posts: postsReducer,
});

const middleware = [
  thunkMiddleware,
  localStorageMiddleware,
  routerMiddleware(history),
];

const persistedState = loadFromLocalStorage();

export const store = createStore(rootReducer, persistedState, composeEnhancers(applyMiddleware(...middleware)));

const app = (
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <App />
    </ConnectedRouter>
  </Provider>
);

ReactDOM.render(
  <React.StrictMode>
    {app}
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
