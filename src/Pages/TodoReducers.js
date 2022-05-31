import { ADD_TODO, DELETE_TODO, UPDATE_TODO, FETCHED_TODO, TOGGLE_TODO, CLEAR_TODO } from "./todoActions";
import { todos } from "./state";

export let todoReducer = (state = todos, action) => {
  let newTodos, isCompleted, indexSameId, sameId, lastElement, lastId;
  switch (action.type) {
    case ADD_TODO:
      lastElement = state[state.length - 1] || {};
      lastId = lastElement.id || 0;
      const addedTodo = { id: ++lastId, title: action.payload, completed: false };
      return [...state, addedTodo];
    case DELETE_TODO:
      newTodos = [...state];
      newTodos = newTodos.filter((todo) => todo.id !== action.payload);
      return newTodos;
    case UPDATE_TODO:
      newTodos = [...state];
      sameId = (element) => element.id === action.payload.id;
      indexSameId = newTodos.findIndex(sameId);
      isCompleted = newTodos[indexSameId].completed;
      newTodos[indexSameId] = { id: action.payload.id, title: action.payload.title, completed: isCompleted };
      return newTodos;
    case TOGGLE_TODO:
      //2 ways of toggling/2nd way faster
      //newTodos = state.map((item) => (item.id === action.payload ? { ...item, completed: !item.completed } : item));
      newTodos = [...state];
      sameId = (element) => element.id === action.payload;
      indexSameId = newTodos.findIndex(sameId);
      isCompleted = newTodos[indexSameId].completed;
      const titleofTodo = newTodos[indexSameId].title;
      newTodos[indexSameId] = { id: action.payload, title: titleofTodo, completed: !isCompleted };
      return newTodos;

    case FETCHED_TODO:
      lastElement = state[state.length - 1] || {};
      lastId = lastElement.id || 0;
      newTodos = action.payload.map((item) => {
        delete item.userId;
        item.id = ++lastId;
        return item;
      });
      return [...state, ...newTodos];

    case CLEAR_TODO:
      return [];

    default:
      return state;
  }
};
