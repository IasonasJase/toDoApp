export const AddTodoAction = (todo) => (dispatch, getState) => {
  const {
    Todo: { todos },
  } = getState();

  const hasTodo = todos.find((i) => i.todo === todo);

  if (!hasTodo && todo !== "") {
    dispatch({
      type: "ADD_TODO",
      payload: [...todos, { todo }],
    });
  }
};

export const RemoveTodoAction = (todo) => (dispatch, getState) => {
  const {
    Todo: { todos },
  } = getState();

  dispatch({
    type: "DELETE_TODO",
    payload: todos.filter((item) => item.id !== todo.id),
  });
};

export const UpdateTodoAction = (todo) => (dispatch, getState) => {
  const {
    Todo: { todos },
  } = getState();

  dispatch({
    type: "DELETE_TODO",
    payload: todos.map((item) => (item.id === todo.id ? { ...item, title: todo.title } : item)),
  });
};

export const CompleteTodoAction = (todo) => (dispatch, getState) => {
  const {
    Todo: { todos },
  } = getState();

  dispatch({
    type: "DELETE_TODO",
    payload: todos.map((item) => (item.id === todo.id ? { ...item, complete: true } : item)),
  });
};

export const UncompleteTodoAction = (todo) => (dispatch, getState) => {
  const {
    Todo: { todos },
  } = getState();

  dispatch({
    type: "DELETE_TODO",
    payload: todos.map((item) => (item.id === todo.id ? { ...item, complete: false } : item)),
  });
};
