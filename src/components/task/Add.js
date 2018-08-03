import React, {Component} from 'react';
import * as api from "../../api/apiTask";

import PropTypes from 'prop-types';

class AddTask extends Component {
    constructor() {
        super();
        this.state = {
            taskType: '',
            taskStatus: '',
            resolved: '',
            taskDate: '',
            fixDate: '',
            error: null
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
        const value = event.target.value;
        const name = event.target.name;

        this.setState(
            {
                [name]: value
            }
        );
    }

    handleSubmit(event) {
        const task = {
            taskNo: null,
            taskType: this.state.taskType,
            taskStatus: this.state.taskStatus,
            resolved: this.state.resolved,
            taskDate: this.state.taskDate,
            fixDate: this.state.fixDate
        };

        this.addTask(task);
        event.preventDefault();
    }

    addTask(task) {
        const queryToken = localStorage.getItem('token');

        api.addTask(task, queryToken).then(response => {
            if (response.status === 500 && response !== null) {
                this.setState({error: 'Could not add task, please try again.'});
                return;
            }

            this.props.addToTasks(task);
        });
    }

    render() {
        return (
            <form>
                <h2>Add a new task</h2>
                <p>Enter the information about this task</p>
                <label>
                    Task Type:
                    <input name="taskType" type="text" value={this.state.taskType}
                           onChange={this.handleChange}/>
                </label>
                <label>
                    Task Status:
                    <input name="taskStatus" type="text" value={this.state.taskStatus}
                           onChange={this.handleChange}/>
                </label>
                <label>
                    Resolved:
                    <input name="resolved" type="text" value={this.state.resolved}
                           onChange={this.handleChange}/>
                </label>
                <label>
                    Task Date:
                    <input name="taskDate" type="text" value={this.state.taskDate}
                           onChange={this.handleChange}/>
                </label>
                <label>
                    Fix Date:
                    <input name="fixDate" type="text" value={this.state.fixDate}
                           onChange={this.handleChange}/>
                </label>
                <input type="submit" value="Add Task" onClick={this.handleSubmit}/>
            </form>
        );
    }
}

AddTask.propTypes = {
    taskNo: PropTypes.number,
    taskType: PropTypes.string,
    taskStatus: PropTypes.string,
    resolved: PropTypes.string,
    taskDate: PropTypes.string,
    fixDate: PropTypes.string
};

export default AddTask;