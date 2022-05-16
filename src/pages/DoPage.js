import PropTypes from "prop-types";
import React from "react";
import "../pages/toDoPage.css";
import FetchedItems from "./FetchedItems";
import ListItems from "./ListItems";

export class DoPage extends React.Component {
  constructor(props) {
    super(props);
    this.addtoDo = this.addtoDo.bind(this);
    this.handleInput = this.handleInput.bind(this);
    this.handleEdit = this.handleEdit.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
    this.handleUpdate = this.handleUpdate.bind(this);
    this.fetchingData = this.fetchingData.bind(this);
    this.clearData = this.clearData.bind(this);
    this.tdos = JSON.parse(localStorage.getItem("toDo")) || [];
    this.state = {
      active: false,
      storage: [],
      fetchedtoDos: [],
      items: [],
      currentItem: {
        key: "",
        text: "",
        edited: "",
      },
    };
  }

  handleInput(e) {
    this.setState({
      currentItem: {
        key: Date.now(),
        text: e.target.value,
        edited: false,
      },
    });
  }

  handleEdit(key) {
    this.setState((prevState) => ({
      items: prevState.items.map((item) =>
        item.key === key ? { ...item, edited: true } : item
      ),
    }));
  }

  handleUpdate(value, key) {
    const inputValue = document.getElementById(`${key}`).value;

    this.setState((prevState) => ({
      items: prevState.items.map((item) =>
        item.key === key ? { ...item, edited: false, text: inputValue } : item
      ),
    }));
  }

  handleDelete(key) {
    const filteredItems = this.state.items.filter((item) => item.key !== key);
    this.setState({
      items: filteredItems,
    });
    if (filteredItems.length !== 0) {
      this.tdos = filteredItems;
      localStorage.setItem("toDo", JSON.stringify(this.tdos));
    }
  }

  addtoDo(e) {
    e.preventDefault();
    const newItem = this.state.currentItem;
    console.log(newItem);
    if (newItem.text !== "") {
      const newItems = [...this.state.items, newItem];
      if (this.state.storage.length !== 0) {
      }
      this.tdos.push(newItem);
      localStorage.setItem("toDo", JSON.stringify(this.tdos));

      this.setState({
        active: false,
        items: newItems,
        currentItem: {
          key: "",
          text: "",
        },
      });
    } else {
      this.setState({ active: true });
      setTimeout(() => {
        this.setState({ active: false });
      }, 200);
    }
  }

  async componentDidMount() {
    this.setState({
      storage: JSON.parse(localStorage.getItem("toDo")) || [],
    });
  }

  async fetchingData() {
    const url = "https://jsonplaceholder.typicode.com/todos/";
    const response = await fetch(url);
    const data = await response.json();
    const mapedData = data.filter((item) => item.id <= 9);
    this.setState({ fetchedtoDos: mapedData });
  }

  clearData() {
    this.setState({ fetchedtoDos: [], items: [], storage: [] });
    localStorage.removeItem("toDo");
  }

  render() {
    //console.log("consolas storage", localStorage);
    console.log("My to do array ====>", this.tdos);
    console.log(
      "storage compared with items",
      this.state.storage,
      this.state.items
    );
    //console.log("local", this.state.local);
    return (
      <main className="wrapper">
        <nav className="navbar">
          <ul className="nav">
            <li className="nav__item">TODO</li>
          </ul>
        </nav>
        <form
          className={
            !this.state.active ? "todo-form" : "todo-form shake-horizontal"
          }
          onSubmit={this.addtoDo}
        >
          <div className="input-field">
            <input
              type="text"
              id="input--add"
              className="input"
              value={this.state.currentItem.text}
              placeholder="e.g. Go to the gym"
              onChange={this.handleInput}
            />
            <label htmlFor="input--add"></label>
          </div>
          <button type="submit" className="button button--add">
            Add
          </button>
        </form>
        <div className="nav nav__item">
          <button className="button--todo" onClick={this.fetchingData}>
            Fetch
          </button>
        </div>
        <button className="button--todo" onClick={this.clearData}>
          Clear
        </button>
        <ul className="todo-collection">
          <ListItems
            items={this.state.items}
            handleInput={this.handleInput}
            handleDelete={this.handleDelete}
            handleEdit={this.handleEdit}
            handleUpdate={this.handleUpdate}
          />
          {this.state.fetchedtoDos.length !== 0
            ? this.state.fetchedtoDos.map((item) => (
                <FetchedItems items={item} />
              ))
            : null}
          {this.state.storage.length !== 0 ? (
            <ListItems
              items={this.state.storage}
              handleInput={this.handleInput}
              handleDelete={this.handleDelete}
              handleEdit={this.handleEdit}
              handleUpdate={this.handleUpdate}
            />
          ) : null}
        </ul>
      </main>
    );
  }
}

export default DoPage;
