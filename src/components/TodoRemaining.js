import React from 'react';
import PropTypes from 'prop-types';

const TodoRemaining = (props) => {
    return (
        <div>
            {props.remaining} items left
        </div>
    );
};

TodoRemaining.propTypes = {
    remaining: PropTypes.number.isRequired
}

export default TodoRemaining;