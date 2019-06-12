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
          <input type="text" className="todo-input" 
                 placeholder="what needs to be done" 
                 ref={this.todoInput} onKeyUp={this.addTodo}/>

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

  todoInput = React.createRef();

  state = {
    idForTodo: 3,
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

  addTodo = event => {
    if(event.key === 'Enter'){
      const todoInput = this.todoInput.current.value

      if(todoInput.trim().length === 0){
        return
      }

      this.setState((prevState, props) =>{
        let todos = prevState.todos;
        let idForTodo = prevState.idForTodo + 1;

        todos.push({
          id: idForTodo,
          title: todoInput,
          completed: false
        })

        return {todos, idForTodo}

      });

      this.todoInput.current.value = ''
    }
  }

}



export default App;
