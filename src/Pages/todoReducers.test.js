import { todoReducer } from "./todoReducers";
import {
  addTodoAction,
  removeTodoAction,
  updateTodoAction,
  toggleTodoAction,
  clearTodoAction,
  fetchingData,
} from "./todoActions";
import { FETCHED_TODO } from "./todoActions";

test("should add a todo", () => {
  expect(todoReducer([], addTodoAction("jason"))).toStrictEqual([{ id: 1, title: "jason", completed: false }]);
  expect(todoReducer([{ id: 33, title: "football", completed: false }], addTodoAction("basketball"))).toStrictEqual([
    { id: 33, title: "football", completed: false },
    { id: 34, title: "basketball", completed: false },
  ]);
});

test("should delete a todo", () => {
  expect(
    todoReducer(
      [
        { id: 33, title: "football", completed: false },
        { id: 34, title: "basketball", completed: false },
      ],
      removeTodoAction(33)
    )
  ).toStrictEqual([{ id: 34, title: "basketball", completed: false }]);
});

test("should update a todo", () => {
  expect(
    todoReducer(
      [
        { id: 32, title: "hello", completed: false },
        { id: 33, title: "football", completed: false },
        { id: 34, title: "basketball", completed: false },
      ],
      updateTodoAction("volleyball", 33)
    )
  ).toStrictEqual([
    { id: 32, title: "hello", completed: false },
    { id: 33, title: "volleyball", completed: false },
    { id: 34, title: "basketball", completed: false },
  ]);
});

test("should toggle a todo", () => {
  expect(
    todoReducer(
      [
        { id: 32, title: "hello", completed: false },
        { id: 33, title: "football", completed: false },
        { id: 34, title: "basketball", completed: false },
      ],
      toggleTodoAction(33)
    )
  ).toStrictEqual([
    { id: 32, title: "hello", completed: false },
    { id: 33, title: "football", completed: true },
    { id: 34, title: "basketball", completed: false },
  ]);
  expect(
    todoReducer(
      [
        { id: 32, title: "hello", completed: false },
        { id: 33, title: "football", completed: true },
        { id: 34, title: "basketball", completed: false },
      ],
      toggleTodoAction(33)
    )
  ).toStrictEqual([
    { id: 32, title: "hello", completed: false },
    { id: 33, title: "football", completed: false },
    { id: 34, title: "basketball", completed: false },
  ]);
});

test("should clear a todo", () => {
  expect(
    todoReducer(
      [
        { id: 32, title: "hello", completed: false },
        { id: 33, title: "football", completed: false },
        { id: 34, title: "basketball", completed: false },
      ],
      clearTodoAction()
    )
  ).toStrictEqual([]);
});

test("should fetch todos", () => {
  expect(
    todoReducer(
      [
        { id: 1, title: "hello", completed: false },
        { id: 2, title: "football", completed: false },
        { id: 3, title: "basketball", completed: false },
      ],
      {
        type: FETCHED_TODO,
        payload: [
          { id: 4, title: "lorem", completed: false },
          { id: 5, title: "impsum", completed: false },
          { id: 6, title: "dum", completed: true },
          { id: 7, title: "text", completed: false },
          { id: 8, title: "is", completed: false },
          { id: 9, title: "testing", completed: true },
          { id: 10, title: "jest", completed: false },
          { id: 11, title: "react", completed: false },
          { id: 12, title: "redux", completed: false },
        ],
      }
    )
  ).toStrictEqual([
    { id: 1, title: "hello", completed: false },
    { id: 2, title: "football", completed: false },
    { id: 3, title: "basketball", completed: false },
    { id: 4, title: "lorem", completed: false },
    { id: 5, title: "impsum", completed: false },
    { id: 6, title: "dum", completed: true },
    { id: 7, title: "text", completed: false },
    { id: 8, title: "is", completed: false },
    { id: 9, title: "testing", completed: true },
    { id: 10, title: "jest", completed: false },
    { id: 11, title: "react", completed: false },
    { id: 12, title: "redux", completed: false },
  ]);
});
