import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { removeTodoAction, updateTodoAction, toggleTodoAction } from "./todoActions";

const ListItem = (props) => {
  const [input, setInput] = useState(props.item.title);
  const [hidden, setHidden] = useState(false);
  const dispatch = useDispatch();
  const { item } = props;

  return (
    <li data-testid={item.id} className={!item.completed ? "todo-collection__item " : "todo-collection__item fade"}>
      <span className={!hidden ? "todo-collection__item__title" : "todo-collection__item__title hidden"}>
        {item.title}
      </span>
      <input
        value={input}
        id={item.id}
        className={!hidden ? "hidden input input--todo" : "input input--todo"}
        onChange={(e) => setInput(e.target.value)}
      ></input>
      <button
        type="submit"
        onClick={() => {
          dispatch(updateTodoAction(input, item.id));
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
      <button
        data-testid={`Delete${item.id}`}
        onClick={() => dispatch(removeTodoAction(item.id))}
        className="button button--todo button--delete"
      >
        Delete
      </button>
      <button
        onClick={() => {
          dispatch(toggleTodoAction(item.id));
        }}
        className="button button--todo button--delete"
      >
        Complete
      </button>
    </li>
  );
};

export default ListItem;
