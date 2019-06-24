import React, { Component } from 'react'

export default class TodoRemaining extends Component {
    render() {
        return (
            <div>
                {this.props.remaining} items left
            </div>
        )
    }
}
