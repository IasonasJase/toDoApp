import React, { useState } from "react";

const ListItem = (props) => {
  const [input, setInput] = useState(props.item.title);
  const [hidden, setHidden] = useState(false);
  const handleInput = (e) => {
    setInput(e.target.value);
  };

  const { item } = props;

  return (
    <li className={!item.completed ? "todo-collection__item " : "todo-collection__item fade"}>
      <span className={!hidden ? "todo-collection__item__title" : "todo-collection__item__title hidden"}>
        {item.title}
      </span>
      <input
        value={input}
        id={item.id}
        className={!hidden ? "hidden input input--todo" : "input input--todo"}
        onChange={handleInput}
      ></input>
      <button
        type="submit"
        onClick={() => {
          props.handleUpdate(input, item.id);
          setHidden(false);
        }}
        className={!hidden ? "button button--todo button--save hidden" : "button button--todo button--save"}
      >
        Save
      </button>
      <button
        onClick={() => setHidden(true)}
        className={!hidden ? "button button--todo button--edit " : "button button--todo button--edit hidden"}
      >
        Edit
      </button>
      <button onClick={() => props.handleDelete(item.id)} className="button button--todo button--delete">
        Delete
      </button>
      <button
        onClick={() => {
          props.handleComplete(input, item.id);
        }}
        className={!item.completed ? "button button--todo button--delete" : "button button--todo button--delete hidden"}
      >
        Complete
      </button>
      <button
        onClick={() => {
          props.handleUncomplete(input, item.id);
        }}
        className={
          !item.completed ? "button button--todo button--delete hidden" : "button button--todo button--delete "
        }
      >
        Complete
      </button>
    </li>
  );
};

export default ListItem;
