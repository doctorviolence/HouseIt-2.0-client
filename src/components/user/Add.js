import React, {Component} from 'react';

import PropTypes from 'prop-types';

class AddUser extends Component {
    constructor(props) {
        super(props);
        this.state = {
            id: '',
            username: '',
            password: '',
            role: ''
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
        const user = {
            id: null,
            username: this.state.username,
            password: this.state.password,
            role: this.state.role
        };

        this.addUser(user);
        event.preventDefault();
    }

    addUser(user) {
        this.props.addToUsers(user);
    }

    render() {
        return (
            <form>
                <h2>Add a new user</h2>
                <p>Enter the information about this user</p>
                <label>
                    User ID:
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
                <input type="submit" value="Add User" onClick={this.handleSubmit}/>
            </form>
        );
    }
}

AddUser.propTypes = {
    id: PropTypes.number,
    username: PropTypes.string,
    password: PropTypes.string,
    role: PropTypes.string
};

export default AddUser;