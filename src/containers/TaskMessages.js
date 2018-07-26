import React, {Component} from 'react';

import TaskMessage from "../components/taskmessage/TaskMessage";
import styles from "../assets/css/components.css";
import Add from "../components/taskmessage/Add";

class TaskMessages extends Component {
    constructor() {
        super();

        this.addToTaskMessages = this.addToTaskMessages.bind(this);
        this.removeFromTaskMessages = this.removeFromTaskMessages.bind(this);

        this.state = {
            taskMessages: []
        }
    }

    shouldComponentUpdate(nextProps) {
        return nextProps.taskMessages !== this.state.taskMessages;
    }

    componentDidMount() {
        this.getTaskMessages();
    }

    getTaskMessages = () => {
        // add api call here
        this.setState({taskMessages: this.state.taskMessages})
    };

    addToTaskMessages = (taskMessage) => {
        // add api call here
        const updated = [...this.state.taskMessages];
        updated.push(taskMessage);
        this.setState({taskMessages: updated});
    };

    removeFromTaskMessages = (id) => {
        // add api call here
        const taskMessages = [...this.state.taskMessages];
        delete taskMessages[id];
        const updated = taskMessages.filter(el => {
            return el.id !== id;
        });
        this.setState({taskMessages: updated});
    };

    render() {
        return (
            <div>
                <h1>Task Messages</h1>
                <TaskMessage className={styles.taskmessage} taskMessages={this.state.taskMessages}
                      removeTask={this.removeFromTaskMessages}/>
                <Add taskMessages={this.state.taskMessages} addToTaskMessages={this.addToTaskMessages}/>
            </div>
        );
    }
}

export default TaskMessages;