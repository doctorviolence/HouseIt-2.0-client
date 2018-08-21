import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {FormContainer, Title, ButtonContainer, Button, Form} from "../constants/forms";

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

        this.setState({[name]: value});
    }

    handleSubmit(event) {
        event.preventDefault();
        const data = {
            id: null,
            address: this.state.streetAddress,
            floorLevels: this.state.floorLevels
        };
        this.props.toggleAdd();
        this.props.addToBuildings(data);
    }

    render() {
        if (this.props.display) {
            return (
                <FormContainer>
                    <ButtonContainer>
                        <Button onClick={this.props.toggleAdd}> ‹ Cancel</Button>
                        <Button onClick={this.handleSubmit}> Done</Button>
                    </ButtonContainer>
                    <Title>Add new building</Title>
                    <Form onSubmit={this.handleSubmit}>
                        <label>Street address:</label>
                        <input name="streetAddress" type="text" placeholder="Street address" required="true"
                               value={this.state.streetAddress}
                               onChange={this.handleChange}/>
                        <label>Floor levels:</label>
                        <input name="floorLevels" type="number" placeholder="Floor levels" required="true"
                               value={this.state.floorLevels}
                               onChange={this.handleChange}/>
                    </Form>
                </FormContainer>
            );
        }

        return <Button onClick={this.props.toggleAdd}>Add new building</Button>;
    }
}

AddBuilding.propTypes = {
    id: PropTypes.number,
    streetAddress: PropTypes.string,
    floorLevels: PropTypes.number
};

export default AddBuilding;