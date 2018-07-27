import React from 'react';

import Edit from './Edit';

const taskMessage = (props) => (
    <div className="TaskMessage">
        <li key={props.id}>
            <b>Message No.: </b>{props.messageNo}
            <b>Text: </b>{props.text}
            <Edit/>
            <button onClick={() => this.props.removeTaskMessage(props.id)}>Remove</button>
        </li>
    </div>
);

export default taskMessage;