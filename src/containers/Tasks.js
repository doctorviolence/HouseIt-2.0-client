import React, {Component} from 'react';

import Task from "../components/task/Task";
import styles from "../assets/css/components.css";
import Add from "../components/task/Add";

class Tasks extends Component {
    constructor() {
        super();

        this.addToTasks = this.addToTasks.bind(this);
        this.removeFromTasks = this.removeFromTasks.bind(this);

        this.state = {
            tasks: []
        }
    }

    shouldComponentUpdate(nextProps) {
        return nextProps.tasks !== this.state.tasks;
    }

    componentDidMount() {
        this.getTasks();
    }

    getTasks = () => {
        // add api call here
        this.setState({tasks: this.state.tasks})
    };

    addToTasks = (task) => {
        // add api call here
        const updated = [...this.state.tasks];
        updated.push(task);
        this.setState({tasks: updated});
    };

    removeFromTasks = (id) => {
        // add api call here
        const tasks = [...this.state.tasks];
        delete tasks[id];
        const updated = tasks.filter(el => {
            return el.id !== id;
        });
        this.setState({tasks: updated});
    };

    render() {
        return (
            <div>
                <h1>Tasks</h1>
                <Task className={styles.task} tasks={this.state.tasks}
                        removeTask={this.removeFromTasks}/>
                <Add tasks={this.state.tasks} addToTasks={this.addToTasks}/>
            </div>
        );
    }
}

export default Tasks;