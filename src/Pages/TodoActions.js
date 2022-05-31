export const ADD_TODO = "ADD_TODO";
export const DELETE_TODO = "DELETE_TODO";
export const UPDATE_TODO = "UPDATE_TODO";
export const TOGGLE_TODO = "TOGGLE_TODO";
export const FETCHED_TODO = "FETCHED_TODO";
export const CLEAR_TODO = "CLEAR_TODO";
export const UPDATE_LOCALSTORAGE = "ADD_TO_LOCALSTORAGE";

export const addTodoAction = (content) => ({
  type: ADD_TODO,
  payload: content,
});

export const removeTodoAction = (key) => ({
  type: DELETE_TODO,
  payload: key,
});

export const updateTodoAction = (value, key) => ({
  type: UPDATE_TODO,
  payload: {
    id: key,
    title: value,
  },
});

export const toggleTodoAction = (key) => ({
  type: TOGGLE_TODO,
  payload: key,
});

export const clearTodoAction = () => ({
  type: CLEAR_TODO,
});

export const fetchingData = () => async (dispatch) => {
  const url = "https://jsonplaceholder.typicode.com/todos/";
  const response = await fetch(url);
  const data = await response.json();
  const filteredData = data.filter((item) => item.id <= 9);

  dispatch({
    type: FETCHED_TODO,
    payload: filteredData,
  });
};
