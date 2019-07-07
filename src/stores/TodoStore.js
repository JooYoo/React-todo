import { observable, action, computed } from "mobx";
import React from "react";

class TodoStore {
  @observable todoInput = React.createRef();
  @observable filter = "all";
  @observable beforeEditCache = "";
  @observable idForTodo = 4;
  @observable todos = [
    {
      id: 1,
      title: "xBox new",
      completed: false,
      editing: false
    },
    {
      id: 2,
      title: "PlayStation new",
      completed: false,
      editing: false
    },
    {
      id: 3,
      title: "Switch new",
      completed: false,
      editing: false
    }
  ];

  @action addTodo = event => {
    if (event.key === "Enter") {
      const todoInput = this.todoInput.current.value;

      if (todoInput.trim().length === 0) {
        return;
      }

      this.todos.push({
        id: this.idForTodo,
        title: todoInput,
        completed: false
      });

      this.idForTodo++;
      this.todoInput.current.value = "";
    }
  };

  @action deleteTodo = index => {
    this.todos.splice(index, 1);
  };

  @action checkTodo = (todo, index, event) => {
    todo.completed = !todo.completed;
    this.todos.splice(index, 1, todo);
  };

  @action editTodo = (todo, index, event) => {
    todo.editing = true;
    this.todos.splice(index, 1, todo);
  };
}

const store = new TodoStore();
export default store;
