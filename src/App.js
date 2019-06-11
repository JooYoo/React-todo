import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
        </header>
        <div className="Todo-container">
          <input type="text" className="todo-input" placeholder="what needs to be done" />

          {this.state.todos.map((todo, index) =>
            <div key={todo.id} className = "todo-item">
              <div className="todo-item-left">
                <input type="checkbox"/>
                <div className="todo-item-label">{todo.title}</div>
              </div>
              <div className="remove-item">
                &times;
              </div>
            </div>
          )}

        </div>
      </div>
    );
  }

  state = {
    todos: [
      {
        'id': 1,
        'title': 'xBox',
        'completed': false,
        'editing': false
      },
      {
        'id': 2,
        'title': 'PlayStation',
        'completed': false,
        'editing': false
      },
      {
        'id': 3,
        'title': 'Switch',
        'completed': false,
        'editing': false
      }
    ]
  }

}



export default App;
