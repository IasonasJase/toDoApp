import React, { useState, useEffect } from "react";

const ListItem = (props) => {
  const [input, setInput] = useState("");

  useEffect(() => {
    setInput(props.item.title);
  }, []);

  const handleInput = (e) => {
    setInput(e.target.value);
  };

  const { item } = props;

  return (
    <li className="todo-collection__item">
      <span
        className={
          !item.edited
            ? "todo-collection__item__title"
            : "todo-collection__item__title hidden"
        }
      >
        {item.title}
      </span>
      <input
        value={input}
        id={item.id}
        className={
          !item.edited ? "hidden input input--todo" : "input input--todo"
        }
        onChange={handleInput}
      ></input>
      <button
        type="submit"
        onClick={() => {
          props.handleUpdate(input, item.id);
        }}
        className={
          !item.edited
            ? "button button--todo button--save hidden"
            : "button button--todo button--save"
        }
      >
        Save
      </button>
      <button
        onClick={() => props.handleEdit(item.id)}
        className={
          !item.edited
            ? "button button--todo button--edit "
            : "button button--todo button--edit hidden"
        }
      >
        Edit
      </button>
      <button
        onClick={() => props.handleDelete(item.id)}
        className="button
          button--todo
          button--delete
          "
      >
        Delete
      </button>
    </li>
  );
};

export default ListItem;
