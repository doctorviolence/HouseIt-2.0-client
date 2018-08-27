/* eslint-disable no-unused-expressions */
import React, {Component} from 'react';
import {validation} from "../../components/constants/validation";
import Add from "../../components/add/Add";
import Edit from "../../components/edit/Edit";

class BuildingData extends Component {
    state = {
        dataForm: {
            streetAddress: {
                formType: 'input',
                description: 'Address',
                formConfig: {
                    type: 'text',
                    name: 'streetAddress',
                    placeholder: 'Address'
                },
                value: this.props.streetAddress || '',
                validation: {
                    required: true
                },
                valid: false
            }
        },
        formIsValid: false
    };

    changeDataFormHandler = (event) => {
        event.preventDefault();
        const updatedEditForm = {...this.state.dataForm};
        const updatedForm = {...updatedEditForm[event.target.name]};
        updatedForm.value = event.target.value;
        updatedForm.valid = validation(event.target.value, updatedForm.validation);
        updatedEditForm[event.target.name] = updatedForm;

        let isValid = true;
        for (let i in updatedEditForm) {
            isValid = updatedEditForm[i].valid && isValid;
        }

        this.setState({dataForm: updatedEditForm, formIsValid: isValid});
    };

    addBuilding = () => {
        const data = {
            id: null,
            address: this.state.dataForm.streetAddress.value
        };

        if (this.state.formIsValid) {
            this.props.toggleAdd;
            this.props.addBuilding(data);
        } else {
            // Replacing this with error message, eventually...
        }
    };

    editBuilding = () => {
        const id = this.props.id;
        const data = {
            buildingId: id,
            address: this.state.dataForm.streetAddress.value
        };

        if (this.state.formIsValid) {
            this.props.toggleEdit;
            this.props.editBuilding(data, id);
        } else {
            // Replacing this with error message, eventually...
        }
    };

    render() {
        if (this.props.add) {
            return (
                <Add display={this.props.add}
                     title={"Add new building"}
                     addForm={this.state.dataForm}
                     toggleAdd={this.props.toggleAdd}
                     submitData={this.addBuilding}
                     addFormChanged={(event) => this.changeDataFormHandler(event)}/>
            );
        }
        if (this.props.edit) {
            return (
                <Edit display={this.props.edit}
                      title={"Edit building"}
                      editForm={this.state.dataForm}
                      toggleEdit={this.props.toggleEdit}
                      submitData={this.editBuilding}
                      editFormChanged={(event) => this.changeDataFormHandler(event)}/>
            );
        }
        return null;
    }
}

export default BuildingData;