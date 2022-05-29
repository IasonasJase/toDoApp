import {
  ADD_TODO,
  DELETE_TODO,
  UPDATE_TODO,
  FETCHING_TODO,
  COMPLETE_TODO,
  UNCOMPLETE_TODO,
  CLEAR_TODO,
} from "./todoActions";
import { todos } from "./state";

export let todoReducer = (state = todos, action) => {
  let newTodos;
  switch (action.type) {
    case ADD_TODO:
      return [...state, action.payload];
    case DELETE_TODO:
      newTodos = [...state];
      newTodos = newTodos.filter((todo) => todo.id !== action.payload);
      return newTodos;
    case UPDATE_TODO:
      // newTodos = [...state];
      // let index = -1;
      // for (let i = 0; i < newTodos.length; i++) {
      //   index++;
      //   if (newTodos[i].id === action.payload.id) {
      //     break;
      //   }
      // }
      // if (index !== -1) {
      //   newTodos[index] = action.payload;
      //   return newTodos;
      // }
      // return newTodos;
      newTodos = state.map((item) => (item.id === action.payload.id ? { ...item, title: action.payload.title } : item));
      return newTodos;
    case COMPLETE_TODO:
      newTodos = state.map((item) =>
        item.id === action.payload.id ? { ...item, completed: action.payload.completed } : item
      );
      return newTodos;

    case UNCOMPLETE_TODO:
      newTodos = state.map((item) =>
        item.id === action.payload.id ? { ...item, completed: action.payload.completed } : item
      );
      return newTodos;

    case FETCHING_TODO:
      return [...state, ...action.payload];

    case CLEAR_TODO:
      return action.payload;

    default:
      return state;
  }
};
