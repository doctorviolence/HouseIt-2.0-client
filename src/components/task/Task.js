import React from 'react';

import Edit from './Edit';

const task = (props) => (
    <div className="Task">
        <li key={props.id}>
            <b>Task No.: </b>{props.taskNo}
            <b>Task Type: </b>{props.taskType}
            <b>Task Status: </b>{props.taskStatus}
            <b>Resolved: </b>{props.resolved}
            <b>Task Date: </b>{props.taskDate}
            <b>Fix Date: </b>{props.fixDate}
            <Edit/>
            <button onClick={() => this.props.removeTask(props.id)}>Remove</button>
        </li>
    </div>
);

export default task;