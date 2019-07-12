import React from "react";
import { inject, observer } from 'mobx-react';


const TodoFiltered = inject('TodoStore')(observer (props => {
  const TodoStore = props.TodoStore;
  return (
    <div>
      <button
        onClick={event => TodoStore.updateFilter("all")}
        className={TodoStore.filter === "all" ? "active" : ""}
      >
        All
      </button>
      <button
        onClick={event => TodoStore.updateFilter("active")}
        className={TodoStore.filter === "active" ? "active" : ""}
      >
        Active
      </button>
      <button
        onClick={event => TodoStore.updateFilter("completed")}
        className={TodoStore.filter === "completed" ? "active" : ""}
      >
        Completed
      </button>
    </div>
  );
}));

TodoFiltered.propTypes = {
    // updateFilter: PropTypes.func.isRequired,
    // filter: PropTypes.string.isRequired
};

export default TodoFiltered;