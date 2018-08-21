import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {FormContainer, Title, ButtonContainer, Button, Form} from "../constants/forms";

class EditBuilding extends Component {
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

        this.setState({[name]: value});
    }

    handleSubmit(event) {
        event.preventDefault();
        const data = {
            buildingId: this.props.id,
            address: this.state.streetAddress,
            floorLevels: this.state.floorLevels
        };
        this.props.toggleEdit();
        this.props.editBuilding(data);
    }

    render() {
        if (this.props.display) {
            return (
                <FormContainer>
                    <ButtonContainer>
                        <Button onClick={this.props.toggleEdit}> ‹ Cancel</Button>
                        <Button onClick={this.handleSubmit}> Done</Button>
                    </ButtonContainer>
                    <Title>Edit building</Title>
                    <Form onSubmit={this.handleSubmit}>
                        <label>Street address:</label>
                        <input name="streetAddress" type="text" placeholder={this.props.address} required="true"
                               value={this.state.streetAddress}
                               onChange={this.handleChange}/>
                        <label>Floor levels:</label>
                        <input name="floorLevels" type="number" placeholder={this.props.floors} required="true"
                               value={this.state.floorLevels}
                               onChange={this.handleChange}/>
                    </Form>
                </FormContainer>
            );
        }

        return <Button onClick={this.props.toggleEdit}>Edit</Button>;
    }
}

EditBuilding.propTypes = {
    streetAddress: PropTypes.string,
    floorLevels: PropTypes.number
};

export default EditBuilding;