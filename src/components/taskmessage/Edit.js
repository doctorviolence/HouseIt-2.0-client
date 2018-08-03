import React, {Component} from 'react';
import PropTypes from 'prop-types';

class EditTaskMessage extends Component {

    editTaskMessage(taskMessage) {

    }

    render() {
        return (
            <button>Edit</button>
        )
    }
}

EditTaskMessage.propTypes = {
    messageNo: PropTypes.number,
    text: PropTypes.string
};

export default EditTaskMessage;