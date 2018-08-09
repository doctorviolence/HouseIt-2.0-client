import React from 'react';

import Edit from './Edit';

const task = (props) => (
    <ul key={props.taskNo} onClick={() => props.clicked()}>
        <li key={props.taskNo}>
            <b>Task No.: </b>{props.taskNo}
            <b>Task Type: </b>{props.taskType}
            <b>Task Status: </b>{props.taskStatus}
            <b>Resolved: </b>{props.resolved}
            <b>Task Date: </b>{props.taskDate}
            <b>Fix Date: </b>{props.fixDate}
            <Edit/>
            <button onClick={() => props.removeTask(props.taskNo)}>Remove</button>
        </li>
    </ul>
);

export default task;