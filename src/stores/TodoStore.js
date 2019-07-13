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

  @action deleteTodo = id => {
    const index = this.todos.findIndex(item=>item.id === id);
    this.todos.splice(index, 1);
  };

  @action checkTodo = (todo, event) => {
    todo.completed = !todo.completed;

    const index = this.todos.findIndex(item=>item.id === todo.id);
    this.todos.splice(index, 1, todo);
  };

  @action editTodo = (todo, event) => {
    todo.editing = true;
    this.beforeEditCache = todo.title;

    const index = this.todos.findIndex(item=>item.id === todo.id);
    this.todos.splice(index, 1, todo);
  };

  @action doneEdit = (todo, event) => {
    todo.editing = false;
    if (event.target.value.trim().length === 0) {
      todo.title = this.beforeEditCache;
    } else {
      todo.title = event.target.value;
    }

    const index = this.todos.findIndex(item=>item.id === todo.id);
    this.todos.splice(index, 1, todo);
  };

  @action cancelEdit = (todo, event) => {
    todo.title = this.beforeEditCache;
    todo.editing = false;

    const index = this.todos.findIndex(item=>item.id === todo.id);
    this.todos.splice(index, 1, todo);
  };

  @action checkAllTodos = event => {
    this.todos.forEach(todo => (todo.completed = event.target.checked));
  };

  @computed get remaining() {
    return this.todos.filter(x => !x.completed).length;
  };

  @computed get anyRemaining() {
    return this.remaining !== 0;
  };

  @action updateFilter = filter => {
    this.filter = filter;
  };

  @computed get todosFiltered(){
    if (this.filter === "all") {
      return this.todos;
    } else if (this.filter === "active") {
      return this.todos.filter(x => !x.completed);
    } else if (this.filter === "completed") {
      return this.todos.filter(x => x.completed);
    }
    return this.todos;
  };

  @computed get todosCompletedCount() {
    return this.todos.filter(x => x.completed).length;
  };

  @action clearCompleted = () => {
    this.todos = this.todos.filter(todo => !todo.completed);
  };
}

const store = new TodoStore();
export default store;
