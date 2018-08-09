import React, {Component} from 'react';
import * as api from "../../api/apiApartment";

import PropTypes from 'prop-types';

class AddApartment extends Component {
    constructor() {
        super();
        this.state = {
            apartmentNo: '',
            floorNo: '',
            size: '',
            rent: '',
            buildingId: '',
            error: null
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
        const data = {
            id: null,
            apartmentNo: this.state.apartmentNo,
            floorNo: this.state.floorNo,
            size: this.state.size,
            rent: this.state.rent,
            building: {buildingId: this.state.buildingId}
        };

        this.addApartment(data);
        event.preventDefault();
    }

    addApartment(data) {
        const queryToken = localStorage.getItem('token');

        api.addApartment(data, queryToken).then(response => {
            if (response.status === 500 && response !== null) {
                this.setState({error: 'Could not add apartment, please try again.'});
                return;
            }

            // Cannot add to database due to data integrity violation (TO-DO)
            this.props.addToApartments(data);
        });
    }

    render() {
        return (
            <form>
                <h2>Add a new apartment</h2>
                <p>Enter the information about this apartment</p>
                <label>
                    Apartment No.:
                    <input name="apartmentNo" type="text" value={this.state.apartmentNo}
                           onChange={this.handleChange}/>
                </label>
                <label>
                    Floor No.:
                    <input name="floorNo" type="number" value={this.state.floorNo}
                           onChange={this.handleChange}/>
                </label>
                <label>
                    Rent:
                    <input name="rent" type="number" value={this.state.rent}
                           onChange={this.handleChange}/>
                </label>
                <label>
                    Size:
                    <input name="size" type="number" value={this.state.size}
                           onChange={this.handleChange}/>
                </label>
                <label>
                    Building:
                    <input name="buildingId" type="number" value={this.state.buildingId}
                           onChange={this.handleChange}/>
                </label>
                <input type="submit" value="Add Apartment" onClick={this.handleSubmit}/>
            </form>
        );
    }
}

AddApartment.propTypes = {
    id: PropTypes.number,
    apartmentNo: PropTypes.string,
    floorLevels: PropTypes.number,
    rent: PropTypes.number,
    size: PropTypes.number,
    buildingId: PropTypes.number
};

export default AddApartment;