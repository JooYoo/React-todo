import React, { Component } from "react";
import logo from "../logo.svg";
import "../App.css";
import ReactCSSTransitionGroup from "react-addons-css-transition-group";
import TodoRemaining from "./TodoRemaining";
import TodoItem from "./TodoItem";
import TodosCheckAll from "./TodosCheckAll";
import TodoFiltered from "./TodoFiltered";
import TodoClearCompleted from "./TodoClearCompleted";
import {inject, observer} from 'mobx-react';

@inject('TodoStore')
@observer
class App extends Component {
  render() {
    const TodoStore =this.props.TodoStore;
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
            ref={TodoStore.todoInput}
            onKeyUp={TodoStore.addTodo}
          />

          {TodoStore.todos.map((todo, index) => (
            <TodoItem
              key={todo.id}
              todo={todo}
              index={index}
            />
          ))}

          <div className="extra-container">
            {/* <TodosCheckAll
              anyRemaining={this.anyRemaining}
              checkAllTodos={this.checkAllTodos}
            /> */}
            <TodoRemaining />
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

  // todoInput = React.createRef();

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

  // remaining = () => {
  //   return this.state.todos.filter(x => !x.completed).length;
  // };

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
