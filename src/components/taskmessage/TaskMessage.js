import React from 'react';

const taskMessage = (props) => (
    <ul key={props.messageNo} onClick={() => props.clicked()}>
        <li key={props.messageNo}>
            <b>Message No.: </b>{props.messageNo}
            <b>Text: </b>{props.text}
            <button onClick={() => props.removeTaskMessage(props.messageNo)}>Remove</button>
        </li>
    </ul>
);

export default taskMessage;