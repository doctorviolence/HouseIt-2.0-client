import React, {Component} from 'react';

import Edit from './/Edit';

class Task extends Component {
    render() {
        let tasks = this.props.tasks.map((t, i) => {
            return (
                <li key={i}>
                    <b>Task No.: </b>{t.taskNo}
                    <b>Task Type: </b>{t.taskType}
                    <b>Task Status: </b>{t.taskStatus}
                    <b>Resolved: </b>{t.resolved}
                    <b>Task Date: </b>{t.taskDate}
                    <b>Fix Date: </b>{t.fixDate}
                    <Edit/>
                    <button onClick={() => this.props.removeTask(i)}>Remove</button>
                </li>
            )
        });

        console.log(Object.prototype.toString.call(tasks));
        console.log(tasks);

        if (tasks.length !== 0) {
            return (
                <ul>
                    {tasks}
                </ul>
            )
        }
        else {
            return (
                <p>
                    There are no tasks currently available.
                </p>
            )
        }
    }
}

export default Task;