import React, { useEffect, useState } from "react";
import "../Pages/Pagecss.css";
import ListItem from "./ListItem";

let counter = 10;
const DoPage = () => {
  const [active, setActive] = useState(false);
  const [items, setItems] = useState([]);
  const [currentItem, setCurrentItem] = useState({
    id: "",
    title: "",
    edited: "",
  });

  const handleInput = (e) => {
    setCurrentItem({
      id: counter++,
      title: e.target.value,
      edited: false,
    });
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

    const tdos = JSON.parse(localStorage.getItem("toDo")) || [];
    console.log("key", key);
    console.log("tdos array", tdos);
    tdos[key] = { id: key, title: value, edited: false };
    localStorage.setItem("toDo", JSON.stringify(tdos));
  };

  const handleDelete = (key) => {
    const filteredItems = items.filter((item) => item.id !== key);

    setItems(filteredItems);
    localStorage.setItem("toDo", JSON.stringify(filteredItems));
  };

  const addtoDo = (e) => {
    e.preventDefault();
    const newItem = currentItem;
    console.log(newItem);
    if (newItem.title !== "") {
      const newItems = [...items, newItem];
      if (items.length !== 0) {
      }

      const tdos = JSON.parse(localStorage.getItem("toDo")) || [];
      tdos.push(newItem);
      localStorage.setItem("toDo", JSON.stringify(tdos));

      setActive(false);
      setItems(newItems);
      setCurrentItem({
        id: "",
        title: "",
      });
    } else {
      setActive(true);
      setTimeout(() => {
        setActive(false);
      }, 250);
    }
  };

  useEffect(() => {
    setItems(JSON.parse(localStorage.getItem("toDo")) || []);
  }, []);

  const fetchingData = async () => {
    const url = "https://jsonplaceholder.typicode.com/todos/";
    const response = await fetch(url);
    const data = await response.json();
    const filteredData = data.filter((item) => item.id <= 9);
    const mapedData = filteredData.map((item) => {
      delete item.userId;
      delete item.completed;
      return item;
    });

    setItems(mapedData);
  };

  const clearData = () => {
    setItems([]);
    localStorage.removeItem("toDo");
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
            value={currentItem.title}
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
          />
        ))}
      </ul>
    </main>
  );
};

export default DoPage;
