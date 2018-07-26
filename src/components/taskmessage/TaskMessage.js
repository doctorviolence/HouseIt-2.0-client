import React, {Component} from 'react';

import Edit from './/Edit';

class TaskMessage extends Component {
    render() {
        let taskMessages = this.props.taskMessages.map((t, i) => {
            return (
                <li key={i}>
                    <b>Message No.: </b>{t.messageNo}
                    <b>Text: </b>{t.messageText}
                    <Edit/>
                    <button onClick={() => this.props.removeTaskMessage(i)}>Remove</button>
                </li>
            )
        });

        console.log(Object.prototype.toString.call(taskMessages));
        console.log(taskMessages);

        if (taskMessages.length !== 0) {
            return (
                <ul>
                    {taskMessages}
                </ul>
            )
        }
        else {
            return (
                <p>
                    There are no task messages currently available.
                </p>
            )
        }
    }
}

export default TaskMessage;