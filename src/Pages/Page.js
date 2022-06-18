import React, { useState } from "react";
import "./Pagecss.css";
import { useDispatch, useSelector } from "react-redux";
import ListItem from "./ListItem";
import { addTodoAction, fetchingData, clearTodoAction } from "./todoActions";

const DoPage = () => {
  const [title, setTitle] = useState("");
  const [shake, setShake] = useState(false);
  const dispatch = useDispatch();
  const todos = useSelector((state) => state.todos);

  const handleChange = (event) => setTitle(event.target.value);

  const addToDo = (e) => {
    e.preventDefault();
    if (title.trim().length > 0) {
      dispatch(addTodoAction(title));
      setShake(false);
    } else {
      setShake(true);
      setTimeout(() => {
        setShake(false);
      }, 250);
    }
    setTitle("");
  };

  const handleFetch = () => {
    dispatch(fetchingData());
  };

  const handleClear = () => {
    dispatch(clearTodoAction());
  };

  return (
    <main className="wrapper">
      <nav className="navbar">
        <ul className="nav">
          <li className="nav__item">TODO</li>
        </ul>
      </nav>
      <form className={!shake ? "todo-form" : "todo-form shake-horizontal"} onSubmit={addToDo}>
        <div className="input-field">
          <input
            data-testid="input"
            type="text"
            id="input--add"
            className="input"
            placeholder="e.g. Go to the gym"
            onChange={handleChange}
            value={title}
          />
          <label htmlFor="input--add"></label>
        </div>
        <button data-testid="Add" type="submit" className="button button--add">
          Add
        </button>
      </form>
      <div className="nav nav__item">
        <button data-testid="Fetch" className="button--todo" onClick={handleFetch}>
          Fetch
        </button>
      </div>
      <button className="button--todo" onClick={handleClear}>
        Clear
      </button>
      <ul className="todo-collection" data-testid="testidforli">
        {todos && todos.map((item) => <ListItem key={item.id} item={item} />)}
      </ul>
    </main>
  );
};

export default DoPage;
