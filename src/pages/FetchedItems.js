import React, { Component } from "react";

import "../pages/toDoPage.css";

function FetchedItems(props) {
  const item = props.items;

  return (
    <li className="todo-collection__item">
      <span>
        {item.id} {item.completed} {item.title}
      </span>
      <span>{item.completed}</span>
    </li>
  );
}

export default FetchedItems;
