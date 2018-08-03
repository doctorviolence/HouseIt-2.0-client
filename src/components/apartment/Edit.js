import React, {Component} from 'react';
import PropTypes from 'prop-types';
import * as api from "../../api/apiApartment";

class EditApartment extends Component {
    state = {
        id: '',
        apartmentNo: '',
        floorNo: 0,
        rent: 0,
        size: 0,
        edited: false
    };

    editDataHandler = () => {
        const data = {
            id: this.state.id,
            apartmentNo: this.state.apartmentNo,
            floorNo: this.state.floorNo,
            size: this.state.size,
            rent: this.state.rent
        };

        api.updateApartment(data).then(response => {
            //if (response.status === 500 && response !== null) {
            //    this.setState({error: 'Could not update apartment, please try again.'});
            //    return;
            //}
            //this.setState({edited: true});
            this.props.history.replace('/apartment');
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

EditApartment.propTypes = {
    id: PropTypes.number,
    apartmentNo: PropTypes.string,
    floorLevels: PropTypes.number,
    rent: PropTypes.number,
    size: PropTypes.number
};

export default EditApartment;