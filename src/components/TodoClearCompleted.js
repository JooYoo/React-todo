import React from "react";
import PropTypes from "prop-types";

const TodoClearCompleted = props => {
  return (
    <div>
      <button onClick={props.clearCompleted}>
          Clear Completed
      </button>
    </div>
  );
};

TodoClearCompleted.propTypes = {
    clearCompleted: PropTypes.func.isRequired,
};

export default TodoClearCompleted;
