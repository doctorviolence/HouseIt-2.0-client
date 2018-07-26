import React, {Component} from 'react';

import PropTypes from 'prop-types';

class AddManager extends Component {
    constructor(props) {
        super(props);
        this.state = {
            id: ''
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
        const manager = {
            id: null
        };

        this.addManager(manager);
        event.preventDefault();
    }

    addManager(manager) {
        this.props.addToManagers(manager);
    }

    render() {
        return (
            <form>
                <h2>Add a new manager</h2>
                <p>Enter the information about this manager</p>
                <label>
                    Manager ID:
                    <input name="id" type="text" value={this.state.id}
                           onChange={this.handleChange}/>
                </label>
                <input type="submit" value="Add Manager" onClick={this.handleSubmit}/>
            </form>
        );
    }
}

AddManager.propTypes = {
    id: PropTypes.number
};

export default AddManager;