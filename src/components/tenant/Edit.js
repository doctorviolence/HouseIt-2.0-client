import React, {Component} from 'react';
import PropTypes from 'prop-types';

class EditTenant extends Component {

    editTenant(tenant) {

    }

    render() {
        return (
            <button>Edit</button>
        )
    }
}

EditTenant.propTypes = {
    id: PropTypes.number,
    firstName: PropTypes.string,
    lastName: PropTypes.string,
    phoneNo: PropTypes.string
};

export default EditTenant;