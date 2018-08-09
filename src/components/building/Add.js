import React, {Component} from 'react';

import PropTypes from 'prop-types';
import * as api from "../../api/apiBuilding";

class AddBuilding extends Component {
    constructor() {
        super();
        this.state = {
            streetAddress: '',
            floorLevels: '',
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
        event.preventDefault();
        const data = {
            id: null,
            address: this.state.streetAddress,
            floorLevels: this.state.floorLevels
        };

        this.addBuilding(data);
    }

    addBuilding(data) {
        const queryToken = localStorage.getItem('token');

        api.addBuilding(data, queryToken).then(response => {
            if (response.status === 500 && response !== null) {
                this.setState({error: 'Could not add building, please try again.'});
                return;
            }

            this.props.addToBuildings(data);
        });
    }

    render() {
        return (
            <form>
                <h2>Add a new building</h2>
                <p>Enter the information about this building</p>
                <label>
                    Street address:
                    <input name="streetAddress" type="text" value={this.state.streetAddress}
                           onChange={this.handleChange}/>
                </label>
                <label>
                    Floor levels:
                    <input name="floorLevels" type="number" value={this.state.floorLevels}
                           onChange={this.handleChange}/>
                </label>
                <input type="submit" value="Add Building" onClick={this.handleSubmit}/>
            </form>
        );
    }
}

AddBuilding.propTypes = {
    id: PropTypes.number,
    streetAddress: PropTypes.string,
    floorLevels: PropTypes.number
};

export default AddBuilding;