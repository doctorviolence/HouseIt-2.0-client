import React, {Component} from 'react';

import PropTypes from 'prop-types';

class AddTaskMessage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            messageNo: '',
            text: ''
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
        const taskMessage = {
            messageNo: null,
            text: this.state.text
        };

        this.addTaskMessage(taskMessage);
        event.preventDefault();
    }

    addTaskMessage(taskMessage) {
        this.props.addToTaskMessages(taskMessage);
    }

    render() {
        return (
            <form>
                <h2>Add a new task message</h2>
                <p>Enter the information about this task message</p>
                <label>
                    Message No:
                    <input name="messageNo" type="number" value={this.state.messageNo}
                           onChange={this.handleChange}/>
                </label>
                <label>
                    Text:
                    <input name="text" type="text" value={this.state.text}
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