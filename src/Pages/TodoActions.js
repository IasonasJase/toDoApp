export const ADD_TODO = "ADD_TODO";
export const DELETE_TODO = "DELETE_TODO";
export const UPDATE_TODO = "UPDATE_TODO";
export const COMPLETE_TODO = "COMPLETE_TODO";
export const UNCOMPLETE_TODO = "UNCOMPLETE_TODO";
export const FETCHING_TODO = "FETCH_TODO";
export const CLEAR_TODO = "CLEAR_TODO";

export const addTodoAction = (id, content) => ({
  type: ADD_TODO,
  payload: {
    id: ++id,
    title: content,
    completed: false,
  },
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
    completed: false,
  },
});

export const completeTodoAction = (value, key, completed) => ({
  type: COMPLETE_TODO,
  payload: {
    id: key,
    title: value,
    completed: !completed,
  },
});

export const uncompleteTodoAction = (value, key, completed) => ({
  type: UNCOMPLETE_TODO,
  payload: {
    id: key,
    title: value,
    completed: !completed,
  },
});

export const clearTodoAction = () => ({
  type: CLEAR_TODO,
  payload: [],
});

export const fetchingData = () => async (dispatch) => {
  const url = "https://jsonplaceholder.typicode.com/todos/";
  const response = await fetch(url);
  const data = await response.json();
  const filteredData = data.filter((item) => item.id <= 9);
  const mapedData = filteredData.map((item) => {
    delete item.userId;
    return item;
  });

  dispatch({
    type: FETCHING_TODO,
    payload: mapedData,
  });
};
