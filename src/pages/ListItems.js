import React, { Component } from "react";

import "../pages/toDoPage.css";

function ListItems(props) {
  const items = props.items;
  const listItems = items.map((item) => {
    return (
      <li className="todo-collection__item" key={item.key}>
        <span
          className={
            !item.edited
              ? "todo-collection__item__title"
              : "todo-collection__item__title hidden"
          }
        >
          {item.text}
        </span>
        <input
          //value={item.text}
          id={item.key}
          className={
            !item.edited ? "hidden input input--todo" : "input input--todo"
          }
          //onChange={() => props.handleUpdate()}
        ></input>
        <button
          type="submit"
          onClick={() => props.handleUpdate(item.text, item.key)}
          className={
            !item.edited
              ? "button button--todo button--save hidden"
              : "button button--todo button--save"
          }
        >
          Save
        </button>
        <button
          onClick={() => props.handleEdit(item.key)}
          className={
            !item.edited
              ? "button button--todo button--edit "
              : "button button--todo button--edit hidden"
          }
        >
          Edit
        </button>
        <button
          onClick={() => props.handleDelete(item.key)}
          className="button
          button--todo
          button--delete
          "
        >
          Delete
        </button>
      </li>
    );
  });
  return listItems;
}

export default ListItems;
