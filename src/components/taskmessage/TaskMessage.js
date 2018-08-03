import React from 'react';

const taskMessage = (props) => (
    <ul key={props.id} onClick={() => props.clicked()}>
        <li key={props.id}>
            <b>Message No.: </b>{props.messageNo}
            <b>Text: </b>{props.text}
            <button onClick={() => this.props.removeTaskMessage(props.id)}>Remove</button>
        </li>
    </ul>
);

export default taskMessage;