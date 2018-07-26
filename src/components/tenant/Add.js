import React, {Component} from 'react';

import PropTypes from 'prop-types';

class AddTenant extends Component {
    constructor(props) {
        super(props);
        this.state = {
            id: '',
            firstName: '',
            lastName: '',
            phoneNo: ''
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
        const tenant = {
            id: null,
            phoneNo: this.state.phoneNo,
            firstName: this.state.firstName,
            lastName: this.state.lastName
        };

        this.addTenant(tenant);
        event.preventDefault();
    }

    addTenant(tenant) {
        this.props.addToTenants(tenant);
    }

    render() {
        return (
            <form>
                <h2>Add a new tenant</h2>
                <p>Enter the information about this tenant</p>
                <label>
                    Tenant ID:
                    <input name="id" type="number" value={this.state.id}
                           onChange={this.handleChange}/>
                </label>
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