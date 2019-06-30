import React from "react";
import PropTypes from "prop-types";


const TodoFiltered = props => {
  return (
    <div>
      <button
        onClick={event => props.updateFilter("all")}
        className={props.filter === "all" ? "active" : ""}
      >
        All
      </button>
      <button
        onClick={event => props.updateFilter("active")}
        className={props.filter === "active" ? "active" : ""}
      >
        Active
      </button>
      <button
        onClick={event => props.updateFilter("completed")}
        className={props.filter === "completed" ? "active" : ""}
      >
        Completed
      </button>
    </div>
  );
};

TodoFiltered.propTypes = {
    updateFilter: PropTypes.func.isRequired,
    filter: PropTypes.string.isRequired
};

export default TodoFiltered;