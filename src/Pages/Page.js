import React, { useEffect, useState } from "react";
import "../Pages/Pagecss.css";
import ListItem from "./ListItem";

const DoPage = () => {
  const [active, setActive] = useState(false);
  const [items, setItems] = useState(
    JSON.parse(localStorage.getItem("toDo")) || []
  );
  const [toDo, setToDo] = useState("");

  const handleInput = (e) => {
    setToDo(e.target.value);
  };

  const handleEdit = (key) => {
    setItems((prevState) =>
      prevState.map((item) =>
        item.id === key ? { ...item, edited: true } : item
      )
    );
  };

  const handleUpdate = (value, key) => {
    setItems((prevState) =>
      prevState.map((item) =>
        item.id === key ? { ...item, edited: false, title: value } : item
      )
    );
  };

  const handleDelete = (key) => {
    const filteredItems = items.filter((item) => item.id !== key);
    setItems(filteredItems);
  };

  const handleComplete = (value, key) => {
    setItems((prevState) =>
      prevState.map((item) =>
        item.id === key ? { ...item, completed: true } : item
      )
    );
  };

  const handleUncomplete = (value, key) => {
    setItems((prevState) =>
      prevState.map((item) =>
        item.id === key && item.completed === true
          ? { ...item, completed: false }
          : item
      )
    );
  };

  const addtoDo = (e) => {
    e.preventDefault();
    const lastElement = items[items.length - 1] || {};
    let lastId = lastElement.id || 0;

    const newItem = {
      id: lastId + 1,
      title: toDo,
      edited: false,
      completed: false,
    };
    if (newItem.title !== "") {
      const newItems = [...items, newItem];
      setActive(false);
      setItems(newItems);
      setToDo("");
    } else {
      setActive(true);
      setTimeout(() => {
        setActive(false);
      }, 250);
    }
  };

  useEffect(() => {
    localStorage.setItem("toDo", JSON.stringify(items));
  }, [items]);

  const fetchingData = async () => {
    const url = "https://jsonplaceholder.typicode.com/todos/";
    const response = await fetch(url);
    const data = await response.json();
    const filteredData = data.filter((item) => item.id <= 9);
    const mapedData = filteredData.map((item) => {
      delete item.userId;

      return item;
    });

    setItems(mapedData);
  };

  const clearData = () => {
    setItems([]);
  };

  return (
    <main className="wrapper">
      <nav className="navbar">
        <ul className="nav">
          <li className="nav__item">TODO</li>
        </ul>
      </nav>
      <form
        className={!active ? "todo-form" : "todo-form shake-horizontal"}
        onSubmit={addtoDo}
      >
        <div className="input-field">
          <input
            type="text"
            id="input--add"
            className="input"
            value={toDo}
            placeholder="e.g. Go to the gym"
            onChange={handleInput}
          />
          <label htmlFor="input--add"></label>
        </div>
        <button type="submit" className="button button--add">
          Add
        </button>
      </form>
      <div className="nav nav__item">
        <button className="button--todo" onClick={fetchingData}>
          Fetch
        </button>
      </div>
      <button className="button--todo" onClick={clearData}>
        Clear
      </button>
      <ul className="todo-collection">
        {items.map((item) => (
          <ListItem
            key={item.id}
            item={item}
            handleDelete={handleDelete}
            handleEdit={handleEdit}
            handleUpdate={handleUpdate}
            handleComplete={handleComplete}
            handleUncomplete={handleUncomplete}
          />
        ))}
      </ul>
    </main>
  );
};

export default DoPage;
