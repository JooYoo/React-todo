// import React, { Component } from 'react'

// export default class TodoRemaining extends Component {
//     render() {
//         return (
//             <div>
//                 {this.props.remaining} items left
//             </div>
//         )
//     }
// }

import React from 'react';

const TodoRemaining = (props) => {
    return (
        <div>
            {props.remaining} items left
        </div>
    );
};

export default TodoRemaining;