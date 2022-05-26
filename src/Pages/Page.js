import React, { useEffect, useState } from "react";
import "./Pagecss.css";
import { useDispatch, useSelector } from "react-redux";
//import reducer from "./reducer";
import ListItem from "./ListItem";
import {
  AddTodoAction,
  RemoveTodoAction,
  UpdateTodoAction,
  CompleteTodoAction,
  UncompleteTodoAction,
} from "./TodoActions";

// const DoPage = () => {
//   const [active, setActive] = useState(false);
//   const [items, setItems] = useState(
//     JSON.parse(localStorage.getItem("toDo")) || []
//   );
//   const [toDo, setToDo] = useState("");

//   const handleInput = (e) => {
//     setToDo(e.target.value);
//   };

//   const handleUpdate = (value, key) => {
//     setItems(
//       items.map((item) => (item.id === key ? { ...item, title: value } : item))
//     );
//   };

// const handleDelete = (key) => {
//   const filteredItems = items.filter((item) => item.id !== key);
//   setItems(filteredItems);
// };

//   const handleComplete = (value, key) => {
//     setItems((prevState) =>
//       prevState.map((item) =>
//         item.id === key ? { ...item, completed: true } : item
//       )
//     );
//   };

//   const handleUncomplete = (value, key) => {
//     setItems((prevState) =>
//       prevState.map((item) =>
//         item.id === key && item.completed === true
//           ? { ...item, completed: false }
//           : item
//       )
//     );
//   };

//   const addtoDo = (e) => {
//     e.preventDefault();
//     const lastElement = items[items.length - 1] || {};
//     let lastId = lastElement.id || 0;

//     const newItem = {
//       id: lastId + 1,
//       title: toDo,
//       completed: false,
//     };
//     if (newItem.title !== "") {
//       const newItems = [...items, newItem];
//       setActive(false);
//       setItems(newItems);
//       setToDo("");
//     } else {
//       setActive(true);
//       setTimeout(() => {
//         setActive(false);
//       }, 250);
//     }
//   };

//   useEffect(() => {
//     localStorage.setItem("toDo", JSON.stringify(items));
//   }, [items]);

//   const fetchingData = async () => {
//     const url = "https://jsonplaceholder.typicode.com/todos/";
//     const response = await fetch(url);
//     const data = await response.json();
//     const filteredData = data.filter((item) => item.id <= 9);
//     const mapedData = filteredData.map((item) => {
//       delete item.userId;

//       return item;
//     });

//     setItems(mapedData);
//   };

//   const clearData = () => {
//     setItems([]);
//   };

//   return (
//     <main className="wrapper">
//       <nav className="navbar">
//         <ul className="nav">
//           <li className="nav__item">TODO</li>
//         </ul>
//       </nav>
//       <form
//         className={!active ? "todo-form" : "todo-form shake-horizontal"}
//         onSubmit={addtoDo}
//       >
//         <div className="input-field">
//           <input
//             type="text"
//             id="input--add"
//             className="input"
//             value={toDo}
//             placeholder="e.g. Go to the gym"
//             onChange={handleInput}
//           />
//           <label htmlFor="input--add"></label>
//         </div>
//         <button type="submit" className="button button--add">
//           Add
//         </button>
//       </form>
//       <div className="nav nav__item">
//         <button className="button--todo" onClick={fetchingData}>
//           Fetch
//         </button>
//       </div>
//       <button className="button--todo" onClick={clearData}>
//         Clear
//       </button>
//       <ul className="todo-collection">
// {items.map((item) => (
// <ListItem
//   key={item.id}
//   item={item}
//   handleDelete={handleDelete}
//   handleUpdate={handleUpdate}
//   handleComplete={handleComplete}
//   handleUncomplete={handleUncomplete}
// />
// ))}
//       </ul>
//     </main>
//   );
// };

const DoPage = () => {
  const [toDo, setToDo] = useState([JSON.parse(localStorage.getItem("toDo")) || []]);
  const [input, setInput] = useState("");
  const dispatch = useDispatch();
  const Todo = useSelector((state) => state.Todo);
  const { todos } = Todo;

  const handleChange = (event) => setInput(event.target.value);

  const addToDo = (e) => {
    e.preventDefault();
    const lastElement = toDo[toDo.length - 1] || {};
    let lastId = lastElement.id || 0;
    const newItem = {
      id: lastId + 1,
      title: input,
      completed: false,
    };
    const newItems = [...todos, newItem];
    setToDo(newItems);
    dispatch(AddTodoAction(newItem));
    setInput("");
  };

  const handleDelete = (key) => {
    dispatch(RemoveTodoAction(key));
  };

  const handleUpdate = (value, key) => {
    dispatch(UpdateTodoAction(value, key));
  };

  const handleComplete = (value, key) => {
    dispatch(CompleteTodoAction(value, key));
  };

  const handleUncomplete = (value, key) => {
    dispatch(UncompleteTodoAction(value, key));
  };

  return (
    <main className="wrapper">
      <nav className="navbar">
        <ul className="nav">
          <li className="nav__item">TODO</li>
        </ul>
      </nav>
      <form className={"todo-form"} onSubmit={addToDo}>
        <div className="input-field">
          <input
            type="text"
            id="input--add"
            className="input"
            placeholder="e.g. Go to the gym"
            onChange={handleChange}
            value={input}
          />
          <label htmlFor="input--add"></label>
        </div>
        <button type="submit" className="button button--add">
          Add
        </button>
      </form>
      <div className="nav nav__item">
        <button className="button--todo">Fetch</button>
      </div>
      <button className="button--todo">Clear</button>
      <ul className="todo-collection">
        {todos &&
          todos.map((item) => (
            <ListItem
              key={item.id}
              item={item}
              handleDelete={handleDelete}
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
