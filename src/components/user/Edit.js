import React, {Component} from 'react';
import PropTypes from 'prop-types';

class EditUser extends Component {

    editUser(user) {

    }

    render() {
        return (
            <button>Edit</button>
        )
    }
}

EditUser.propTypes = {
    id: PropTypes.number,
    username: PropTypes.string,
    password: PropTypes.string,
    role: PropTypes.string
};

export default EditUser;