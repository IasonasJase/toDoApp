import { createStore } from "redux";
import { combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import { todoReducer } from "./todoReducers";
// import { saveState, loadState } from "./localstorage";
// import throttle from "lodash.throttle";

const localStorageMiddleware = ({ getState }) => {
  return (next) => (action) => {
    const result = next(action);
    localStorage.setItem("applicationState", JSON.stringify(getState()));
    return result;
  };
};

const reHydrateStore = () => {
  if (localStorage.getItem("applicationState") !== null) {
    return JSON.parse(localStorage.getItem("applicationState"));
  }
};
const reducer = combineReducers({
  todos: todoReducer,
});

const middleware = [thunk];

const store = createStore(
  reducer,
  /* loadState(),*/ reHydrateStore(),
  composeWithDevTools(applyMiddleware(...middleware, localStorageMiddleware))
);

//store.subscribe(throttle(() => saveState(store.getState()), 1000));
export default store;
