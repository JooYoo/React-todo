import React from "react";
import PropTypes from "prop-types";

const TodoItem = props => {
  return (
    <div key={props.todo.id} className="todo-item">
      <div className="todo-item-left">
        <input
          type="checkbox"
          onChange={event => this.checkTodo(props.todo, props.index, event)}
          checked={props.todo.completed}
        />

        {!props.todo.editing && (
          <div
            className={"todo-item-label " + (props.todo.completed ? "completed" : "")}
            onDoubleClick={event => this.editTodo(props.todo, props.index, event)}
          >
            {props.todo.title}
          </div>
        )}
        {props.todo.editing && (
          <input
            className="todo-item-edit"
            type="text"
            autoFocus
            defaultValue={props.todo.title}
            onBlur={event => this.doneEdit(props.todo, props.index, event)}
            onKeyUp={event => {
              if (event.key === "Enter") {
                this.doneEdit(props.todo, props.index, event);
              } else if (event.key === "Escape") {
                this.cancelEdit(props.todo, props.index, event);
              }
            }}
          />
        )}
      </div>
      <div className="remove-item" onClick={event => this.deleteTodo(props.index)}>
        &times;
      </div>
    </div>
  );
};

TodoItem.propTypes = {};

export default TodoItem;
