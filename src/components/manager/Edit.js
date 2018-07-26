import React, {Component} from 'react';
import PropTypes from 'prop-types';

class EditManager extends Component {

    editManager(manager) {

    }

    render() {
        return (
            <button>Edit</button>
        )
    }
}

EditManager.propTypes = {
    id: PropTypes.number
};

export default EditManager;