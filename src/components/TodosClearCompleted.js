import React from "react";
import { inject, observer } from "mobx-react";

const TodosClearCompleted = inject("TodoStore")(observer(props => {
    return (
      <div>
        <button onClick={props.TodoStore.clearCompleted}>
          Clear Completed
        </button>
      </div>
    );
  })
);

TodosClearCompleted.propTypes = {
  // clearCompleted: PropTypes.func.isRequired
};

export default TodosClearCompleted;
