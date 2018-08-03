import React, {Component} from 'react';
import PropTypes from 'prop-types';

class EditTask extends Component {

    editTask(task) {

    }

    render() {
        return (
            <button>Edit</button>
        )
    }
}

EditTask.propTypes = {
    taskNo: PropTypes.number,
    taskType: PropTypes.string,
    taskStatus: PropTypes.string,
    resolved: PropTypes.string,
    taskDate: PropTypes.string,
    fixDate: PropTypes.string
};

export default EditTask;