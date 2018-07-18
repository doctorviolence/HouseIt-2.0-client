import React, {Component} from 'react';
import PropTypes from 'prop-types';

class EditBuilding extends Component {

    editBuilding(building) {

    }

    render() {
        return (
            <button>Edit</button>
        )
    }
}

EditBuilding.propTypes = {
    streetAddress: PropTypes.string,
    floorLevels: PropTypes.number
};

export default EditBuilding;