import React, { Component } from "react";
import logo from "../logo.svg";
import "../App.css";
import ReactCSSTransitionGroup from "react-addons-css-transition-group";
import TodoRemaining from "./TodoRemaining";
import TodoItem from "./TodoItem";
import TodosCheckAll from "./TodosCheckAll";
import TodoFiltered from "./TodoFiltered";
import TodoClearCompleted from "./TodoClearCompleted";

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
        </header>
        <div className="Todo-container">
          <input
            type="text"
            className="todo-input"
            placeholder="what needs to be done"
            ref={this.todoInput}
            onKeyUp={this.addTodo}
          />

          {this.todosFiltered().map((todo, index) => (
            <TodoItem
              key={todo.id}
              todo={todo}
              index={index}
              checkTodo={this.checkTodo}
              editTodo={this.editTodo}
              doneEdit={this.doneEdit}
              cancelEdit={this.cancelEdit}
              deleteTodo={this.deleteTodo}
            />
          ))}

          <div className="extra-container">
            <TodosCheckAll
              anyRemaining={this.anyRemaining}
              checkAllTodos={this.checkAllTodos}
            />
            <TodoRemaining remaining={this.remaining()} />
          </div>

          <div className="extra-container">
            <TodoFiltered
              updateFilter={this.updateFilter}
              filter={this.state.filter}
            />

            <ReactCSSTransitionGroup
              transitionName="fade"
              transitionEnterTimeout={300}
              transitionLeaveTimeout={300}
            >
              {this.todosCompletedCount() > 0 && 
                <TodoClearCompleted clearCompleted={this.clearCompleted}/>
              }
            </ReactCSSTransitionGroup>
          </div>
        </div>
      </div>
    );
  }

  todoInput = React.createRef();

  state = {
    filter: "all",
    beforeEditCache: "",
    idForTodo: 3,
    todos: [
      {
        id: 1,
        title: "xBox",
        completed: false,
        editing: false
      },
      {
        id: 2,
        title: "PlayStation",
        completed: false,
        editing: false
      },
      {
        id: 3,
        title: "Switch",
        completed: false,
        editing: false
      }
    ]
  };

  addTodo = event => {
    if (event.key === "Enter") {
      const todoInput = this.todoInput.current.value;

      if (todoInput.trim().length === 0) {
        return;
      }

      this.setState((prevState, props) => {
        let todos = prevState.todos;
        let idForTodo = prevState.idForTodo + 1;

        todos.push({
          id: idForTodo,
          title: todoInput,
          completed: false
        });

        return { todos, idForTodo };
      });

      this.todoInput.current.value = "";
    }
  };

  deleteTodo = index => {
    this.setState((prevState, props) => {
      let todos = prevState.todos;

      todos.splice(index, 1);

      return { todos };
    });
  };

  checkTodo = (todo, index, event) => {
    this.setState((prevState, props) => {
      let todos = prevState.todos;
      todo.completed = !todo.completed;

      todos.splice(index, 1, todo);

      return { todos };
    });
  };

  editTodo = (todo, index, event) => {
    this.setState((prevState, props) => {
      let todos = prevState.todos;
      todo.editing = true;

      todos.splice(index, 1, todo);

      return { todos, beforeEditCache: todo.title };
    });
  };

  doneEdit = (todo, index, event) => {
    event.persist();

    this.setState((prevState, props) => {
      let todos = prevState.todos;
      todo.editing = false;

      if (event.target.value.trim().length === 0) {
        todo.title = prevState.beforeEditCache;
      } else {
        todo.title = event.target.value;
      }

      todos.splice(index, 1, todo);

      return { todos };
    });
  };

  cancelEdit = (todo, index, event) => {
    this.setState((prevState, props) => {
      let todos = prevState.todos;

      todo.title = prevState.beforeEditCache;
      todo.editing = false;

      todos.splice(index, 1, todo);

      return { todos };
    });
  };

  remaining = () => {
    return this.state.todos.filter(x => !x.completed).length;
  };

  anyRemaining = () => {
    return this.remaining() != 0;
  };

  todosCompletedCount = () => {
    return this.state.todos.filter(x => x.completed).length;
  };

  clearCompleted = () => {
    this.setState((prevState, props) => {
      let todos = prevState.todos;
      todos = todos.filter(todo => !todo.completed);
      return { todos };
    });
  };

  updateFilter = filter => {
    this.setState({ filter });
  };

  todosFiltered = () => {
    if (this.state.filter === "all") {
      return this.state.todos;
    } else if (this.state.filter === "active") {
      return this.state.todos.filter(x => !x.completed);
    } else if (this.state.filter === "completed") {
      return this.state.todos.filter(x => x.completed);
    }
    return this.state.todos;
  };

  checkAllTodos = event => {
    event.persist();

    this.setState((prevState, props) => {
      let todos = prevState.todos;

      todos.forEach(todo => (todo.completed = event.target.checked));

      return { todos };
    });
  };
}

export default App;
