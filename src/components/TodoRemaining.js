import React from "react";
import {inject, observer} from 'mobx-react';

const TodoRemaining = inject('TodoStore')(observer(props => {
  return (
    <div>
        {props.TodoStore.remaining} items left
    </div>
  );
}));

TodoRemaining.propTypes = {
//   remaining: PropTypes.number.isRequired
};

export default TodoRemaining;
