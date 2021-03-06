import GlobalReducer from "../db/global/global.reducer";

// redux
import { createStore, applyMiddleware } from "redux";
import { createLogger } from "redux-logger";
import { combineReducers } from "redux"

// middlewares./middleware.js
import middlewareRouter from './middleware';

const customMiddleWare = store => next => action => {
  middlewareRouter(store, next, action);
}

// Combine Reducers
let reducers = combineReducers({
  GlobalReducer
});

const logger = createLogger({
  collapsed: true, diff: true
});

let store = createStore(
  reducers,
  // window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
  applyMiddleware(customMiddleWare, logger)
);

export default store;
