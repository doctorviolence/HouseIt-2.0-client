import React, {Component} from 'react';
import PropTypes from 'prop-types';

class EditApartment extends Component {

    editApartment(apartment) {

    }

    render() {
        return (
            <button>Edit</button>
        )
    }
}

EditApartment.propTypes = {
    id: PropTypes.number,
    apartmentNo: PropTypes.string,
    floorLevels: PropTypes.number,
    rent: PropTypes.number,
    size: PropTypes.number
};

export default EditApartment;