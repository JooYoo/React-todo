import React from "react";
import {inject, observer} from 'mobx-react';

const TodosCheckAll = inject('TodoStore')(observer(props => {
  return (
    <div>
      <label>
        <input
          type="checkbox"
          checked={!props.TodoStore.anyRemaining}
          onChange={props.TodoStore.checkAllTodos}
        />
        Check All
      </label>
    </div>
  );
}));

TodosCheckAll.propTypes = {
    // TodoStore: PropTypes.object.isRequired,
};

export default TodosCheckAll;
