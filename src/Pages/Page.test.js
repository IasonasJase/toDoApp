import Page from "./Page";
import ListItem from "./ListItem";
import React from "react";
import { createStore } from "redux";
import { render, fireEvent, cleanup, screen, within, getByText } from "@testing-library/react";
import { Provider } from "react-redux";
import { ADD_TODO, DELETE_TODO } from "./todoActions";
import "@testing-library/jest-dom/extend-expect";
import renderer from "react-test-renderer";
import { todoReducer } from "./todoReducers";
import pretty from "pretty";
import store from "./store";
import { combineReducers } from "redux";

function renderWithRedux(component, inititalState) {
  const reducer = combineReducers({
    todos: todoReducer,
  });
  const store = createStore(reducer, inititalState);
  return {
    ...render(<Provider store={store}>{component}</Provider>),
  };
}
describe("Page Component", () => {
  it("renders correctly", () => {
    const { container } = renderWithRedux(<Page />);
    expect(pretty(container.innerHTML)).toMatchSnapshot();
  });

  test("renders Page with redux", () => {
    renderWithRedux(<Page />);
    const element = screen.getByTestId("testidforli");
    expect(element).toHaveTextContent("");
  });

  test("change value of input works", () => {
    renderWithRedux(<Page />);
    const inputEl = screen.getByTestId("input");
    fireEvent.change(inputEl, {
      target: {
        value: "football",
      },
    });
    expect(inputEl.value).toBe("football");
  });

  test("add a todo to the list", () => {
    renderWithRedux(<Page />);

    renderWithRedux(<ListItem item={{ id: 1, title: "hello-world-j", completed: false }} />);
    const liEl = screen.getByTestId(1);

    expect(liEl).toBeInTheDocument();
    expect(liEl).toBeVisible();
    expect(liEl).toHaveTextContent("hello-world-j");
  });

  test("a todo's title from the list", () => {
    renderWithRedux(<Page />);

    renderWithRedux(<ListItem item={{ id: 1, title: "hello-world", completed: false }} />);
    const liEl = screen.getByTestId(1);

    expect(liEl).toHaveTextContent("hello-world");
  });

  test("remove a todo from the list", () => {
    renderWithRedux(<Page />, { todos: [{ id: 1, title: "dada", completed: false }] });
    expect(screen.getByText("dada")).toBeInTheDocument();
    const inputEl = screen.getByTestId("input");
    fireEvent.change(inputEl, {
      target: {
        value: "football",
      },
    });

    const addButton = screen.getByText("Add");
    fireEvent.click(addButton);
    const liEl = screen.getByText("football");
    fireEvent.click(screen.getAllByText("Delete")[1]);
    expect(liEl).not.toBeInTheDocument();
  });

  test("should reset the input", () => {
    renderWithRedux(<Page />);

    const inputValue = screen.getByPlaceholderText("e.g. Go to the gym");
    const buttonEl = screen.getByTestId("Add");
    fireEvent.click(buttonEl);
    expect(inputValue.value).toMatch("");
  });
});
