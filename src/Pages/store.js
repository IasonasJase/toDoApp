import { createStore } from "redux";
import { combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import { todoReducer } from "./todoReducers";
import { saveState, loadState } from "./localstorage";
import throttle from "lodash.throttle";

const reducer = combineReducers({
  todos: todoReducer,
});

const middleware = [thunk];

const store = createStore(reducer, loadState(), composeWithDevTools(applyMiddleware(...middleware)));

store.subscribe(throttle(() => saveState(store.getState()), 1000));
export default store;
