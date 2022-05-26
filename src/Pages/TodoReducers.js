export const TodoReducer = (state = { todos: [] }, action) => {
  switch (action.type) {
    case "ADD_TODO":
      return { todos: action.payload };

    case "DELETE_TODO":
      return { todos: action.payload };

    case "UPDATE_TODO":
      return { todos: action.payload };

    case "COMPLETE_TODO":
      return { todos: action.payload };

    default:
      return state;
  }
};
