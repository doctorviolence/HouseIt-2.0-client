import React, {Component} from 'react';
import * as api from "../../api/apiTenant";

import PropTypes from 'prop-types';

class AddTenant extends Component {
    constructor() {
        super();
        this.state = {
            id: '',
            firstName: '',
            lastName: '',
            phoneNo: '',
            apartmentId: '',
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
            phoneNo: this.state.phoneNo,
            firstName: this.state.firstName,
            lastName: this.state.lastName,
            apartment: {apartmentId: this.state.apartmentId}
        };

        this.addTenant(data);
        event.preventDefault();
    }

    addTenant(data) {
        const queryToken = localStorage.getItem('token');

        api.addTenant(data, queryToken).then(response => {
            if (response.status === 500 && response !== null) {
                this.setState({error: 'Could not add tenant, please try again.'});
                return;
            }

            // Cannot add to database due to data integrity violation (TO-DO)
            this.props.addToTenants(data);
        });
    }

    render() {
        return (
            <form>
                <h2>Add a new tenant</h2>
                <p>Enter the information about this tenant</p>
                <label>
                    First Name:
                    <input name="firstName" type="text" value={this.state.firstName}
                           onChange={this.handleChange}/>
                </label>
                <label>
                    Last Name:
                    <input name="lastName" type="text" value={this.state.lastName}
                           onChange={this.handleChange}/>
                </label>
                <label>
                    Phone No.:
                    <input name="phoneNo" type="text" value={this.state.phoneNo}
                           onChange={this.handleChange}/>
                </label>
                <label>
                    Apartment:
                    <input name="apartmentId" type="number" value={this.state.apartmentId}
                           onChange={this.handleChange}/>
                </label>
                <input type="submit" value="Add Tenant" onClick={this.handleSubmit}/>
            </form>
        );
    }
}

AddTenant.propTypes = {
    id: PropTypes.number,
    firstName: PropTypes.string,
    lastName: PropTypes.string,
    phoneNo: PropTypes.string
};

export default AddTenant;