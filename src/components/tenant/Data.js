import React, {Component} from 'react';
import {validation} from "../constants/validation";
import Add from "../add/Add";
import Edit from "../edit/Edit";

class Data extends Component {
    state = {
        dataForm: {
            firstName: {
                formType: 'input',
                description: 'First Name',
                formConfig: {
                    type: 'text',
                    name: 'firstName',
                    placeholder: 'First Name'
                },
                value: this.props.firstName || '',
                validation: {
                    required: true
                },
                valid: false
            },
            lastName: {
                formType: 'input',
                description: 'Last Name',
                formConfig: {
                    type: 'text',
                    name: 'lastName',
                    placeholder: 'Last Name'
                },
                value: this.props.lastName || '',
                validation: {
                    required: true
                },
                valid: false
            },
            phoneNo: {
                formType: 'input',
                description: 'Phone No.',
                formConfig: {
                    type: 'text',
                    name: 'phoneNo',
                    placeholder: 'Phone No.'
                },
                value: this.props.phoneNo || '',
                validation: {
                    required: true
                },
                valid: false
            },
            email: {
                formType: 'input',
                description: 'Email',
                formConfig: {
                    type: 'email',
                    name: 'email',
                    placeholder: 'Email'
                },
                value: this.props.email || '',
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
        const updatedDataForm = {...this.state.dataForm};
        const updatedForm = {...updatedDataForm[event.target.name]};
        updatedForm.value = event.target.value;
        updatedForm.valid = validation(event.target.value, updatedForm.validation);
        updatedDataForm[event.target.name] = updatedForm;

        let isValid = true;
        for (let i in updatedDataForm) {
            isValid = updatedDataForm[i].valid && isValid;
        }

        this.setState({dataForm: updatedDataForm, formIsValid: isValid});
    };

    addTenant = (event) => {
        event.preventDefault();
        const data = {
            tenantId: null,
            firstName: this.state.dataForm.firstName.value,
            lastName: this.state.dataForm.lastName.value,
            phoneNo: this.state.dataForm.phoneNo.value,
            email: this.state.dataForm.email.value,
            apartment: this.props.apartment
        };

        if (this.state.formIsValid) {
            this.props.toggleAdd;
            this.props.addTenant(data);
        } else {
            // Replacing this with error message, eventually...
        }
    };

    editTenant = (event) => {
        event.preventDefault();
        const id = this.props.id;
        const data = {
            tenantId: id,
            firstName: this.state.dataForm.firstName.value,
            lastName: this.state.dataForm.lastName.value,
            phoneNo: this.state.dataForm.phoneNo.value,
            email: this.state.dataForm.email.value,
            apartment: this.props.apartment
        };

        if (this.state.formIsValid) {
            this.props.toggleEdit;
            this.props.editTenant(data, id);
        }
    };

    render() {
        if (this.props.add) {
            return (
                <Add display={this.props.add}
                     title={"Add new tenant"}
                     addForm={this.state.dataForm}
                     toggleAdd={this.props.toggleAdd}
                     formIsValid={this.state.formIsValid}
                     submitData={(event) => this.addTenant(event)}
                     addFormChanged={(event) => this.changeDataFormHandler(event)}/>
            );
        }
        if (this.props.edit) {
            return (
                <Edit display={this.props.edit}
                      title={"Edit tenant"}
                      editForm={this.state.dataForm}
                      toggleEdit={this.props.toggleEdit}
                      formIsValid={this.state.formIsValid}
                      submitData={(event) => this.editTenant(event)}
                      editFormChanged={(event) => this.changeDataFormHandler(event)}/>
            );
        }
        return null;
    }
}

export default Data;