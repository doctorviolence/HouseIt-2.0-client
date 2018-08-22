import React, {Component} from 'react';
import {connect} from 'react-redux';

import {Container, TextContainer, Button} from "../../components/constants/components";
import * as actions from '../../api/actions';
import {validation} from "../../components/constants/validation";
import Edit from "../../components/edit/Edit";

class Building extends Component {
    state = {
        editForm: {
            streetAddress: {
                formType: 'input',
                description: 'Address',
                formConfig: {
                    type: 'text',
                    name: 'streetAddress',
                    placeholder: 'Address'
                },
                value: this.props.streetAddress,
                validation: {
                    required: false
                },
                valid: true
            }
        },
        formIsValid: false,
        edit: false,
        error: false
    };

    toggleEdit = () => {
        this.setState((prevState) => {
            return {edit: !prevState.edit};
        });
    };

    changeEditFormHandler = (event) => {
        event.preventDefault();
        const updatedEditForm = {...this.state.editForm};
        const updatedForm = {...updatedEditForm[event.target.name]};
        updatedForm.value = event.target.value;
        updatedForm.valid = validation(event.target.value, updatedForm.validation);
        updatedEditForm[event.target.name] = updatedForm;

        let isValid = true;
        for (let i in updatedEditForm) {
            isValid = updatedEditForm[i].valid && isValid;
        }

        this.setState({editForm: updatedEditForm, formIsValid: isValid});
    };

    editData = () => {
        const id = this.props.id;
        const data = {
            buildingId: id,
            address: this.state.editForm.streetAddress.value
        };

        if (this.state.formIsValid) {
            this.toggleEdit();
            this.props.editBuilding(data, id);
        } else {
            // Replacing this with error message, eventually...
        }
    };

    render() {
        return (
            <Container key={this.props.id}>
                <TextContainer>
                    {this.props.streetAddress}
                </TextContainer>
                <Edit display={this.state.edit}
                      title={"Edit building"}
                      editForm={this.state.editForm}
                      toggleEdit={this.toggleEdit}
                      submitData={this.editData}
                      editFormChanged={(event) => this.changeEditFormHandler(event)}/>
                <Button onClick={() => this.props.removeBuilding(this.props.id)}>Remove</Button>
            </Container>
        )
    }
}

const mapStateToProps = state => {
    return {
        apiState: state.apiState
    };
};

const mapDispatchToProps = dispatch => {
    return {
        editBuilding: (building, id) => dispatch(actions.editBuilding(building, id))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Building);