import React, {Component} from 'react';
import * as api from "../../api/taskMessage/apiTaskMessage";

import PropTypes from 'prop-types';

class AddTaskMessage extends Component {
    constructor() {
        super();
        this.state = {
            text: '',
            taskNo: '',
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
        const data = {
            messageNo: null,
            messageText: this.state.text,
            task: {taskNo: this.state.taskNo}
        };

        this.addTaskMessage(data);
        event.preventDefault();
    }

    addTaskMessage(data) {
        const queryToken = localStorage.getItem('token');

        api.addTaskMessage(data, queryToken).then(response => {
            if (response.status === 500 && response !== null) {
                this.setState({error: 'Could not add task message, please try again.'});
                return;
            }

            this.props.addToTaskMessages(data);
        });
    }

    render() {
        return (
            <form>
                <h2>Add a new task message</h2>
                <p>Enter the information about this task message</p>
                <label>
                    Text:
                    <input name="text" type="text" value={this.state.text}
                           onChange={this.handleChange}/>
                </label>
                <label>
                    Task No:
                    <input name="taskNo" type="number" value={this.state.taskNo}
                           onChange={this.handleChange}/>
                </label>
                <input type="submit" value="Add Task Message" onClick={this.handleSubmit}/>
            </form>
        );
    }
}

AddTaskMessage.propTypes = {
    messageNo: PropTypes.number,
    text: PropTypes.string

};

export default AddTaskMessage;