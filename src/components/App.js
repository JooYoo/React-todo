import React, { Component } from "react";
import logo from "../logo.svg";
import "../App.css";
import ReactCSSTransitionGroup from "react-addons-css-transition-group";
import TodoRemaining from "./TodoRemaining";
import TodoItem from "./TodoItem";
import TodosCheckAll from "./TodosCheckAll";
import TodoFiltered from "./TodoFiltered";
import TodosClearCompleted from "./TodosClearCompleted";
import { inject, observer } from "mobx-react";

@inject("TodoStore")
@observer
class App extends Component {
  render() {
    const TodoStore = this.props.TodoStore;
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

          {TodoStore.todosFiltered.map(todo => 
            <TodoItem 
              key={todo.id} 
              todo={todo} 
            />
          )}

          <div className="extra-container">
            <TodosCheckAll />
            <TodoRemaining />
          </div>

          <div className="extra-container">
            <TodoFiltered />

            <ReactCSSTransitionGroup
              transitionName="fade"
              transitionEnterTimeout={300}
              transitionLeaveTimeout={300}
            >
              {TodoStore.todosCompletedCount > 0 &&
                <TodosClearCompleted />
              }
            </ReactCSSTransitionGroup>
          </div>
        </div>
      </div>
    );
  }

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
}

export default App;
