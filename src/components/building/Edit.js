import React, {Component} from 'react';
import PropTypes from 'prop-types';
import ApiBuilding from "../../api/building/apiBuilding";

class EditBuilding extends Component {
    state = {
        streetAddress: '',
        floorLevels: '',
        edited: false
    };

    editDataHandler = () => {
        const data = {
            id: this.state.id,
            streetAddress: this.state.streetAddress,
            floorLevels: this.state.floorLevels
        };

        ApiBuilding.updateBuilding(data).then(response => {
            //if (response.status === 500 && response !== null) {
            //    this.setState({error: 'Could not update building, please try again.'});
            //    return;
            //}
            //this.setState({edited: true});
            this.props.history.replace('/buildings');
        });
    };

    render() {
        return (
            <div>
                <button onClick={this.editDataHandler}>Edit</button>
            </div>
        )
    }
}

EditBuilding.propTypes = {
    streetAddress: PropTypes.string,
    floorLevels: PropTypes.number
};

export default EditBuilding;