import React, {Component} from 'react';

import PropTypes from 'prop-types';

class AddBuilding extends Component {
    constructor(props) {
        super(props);
        this.state = {
            streetAddress: '',
            floorLevels: ''
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
        const building = {
            id: null,
            streetAddress: this.state.streetAddress,
            floorLevels: this.state.floorLevels
        };

        this.addBuilding(building);
        event.preventDefault();
    }

    addBuilding(building) {
        this.props.addToBuildings(building);
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
    streetAddress: PropTypes.string,
    floorLevels: PropTypes.number
};

export default AddBuilding;