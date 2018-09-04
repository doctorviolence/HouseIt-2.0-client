import React, {Component} from 'react';
import {validation} from "../constants/validation";
import Add from "../add/Add";

class UserData extends Component {
    state = {
        dataForm: {
            username: {
                formType: 'input',
                description: 'Email',
                formConfig: {
                    type: 'text',
                    name: 'username',
                    placeholder: 'Email'
                },
                value: this.props.email || '',
                validation: {
                    required: false,
                    email: true
                },
                valid: false
            },
            password: {
                formType: 'input',
                description: 'Password',
                formConfig: {
                    type: 'password',
                    name: 'password',
                    placeholder: 'Password'
                },
                value: '',
                validation: {
                    required: true,
                    minLength: 8
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

    addUser = (event) => {
        event.preventDefault();
        const data = {
            userId: null,
            username: this.state.dataForm.username.value,
            password: this.state.dataForm.password.value,
            role: 'ROLE_TENANT',
            tenant: {
                tenantId: this.props.tenantId,
                firstName: this.props.firstName,
                lastName: this.props.lastName,
                phoneNo: this.props.phoneNo,
                email: this.props.email,
            },
            apartment: this.props.apartment
        };

        if (this.state.formIsValid) {
            this.props.toggleAddUser;
            this.props.addUser(data);
        } else {
            // Replacing this with error message, eventually...
        }
    }
    ;

    editUser = (event) => {
        event.preventDefault();
        const id = this.props.id;
        const data = {
            userId: id,
            name: this.state.dataForm.name.value,
            address: this.state.dataForm.streetAddress.value,
            zipCode: this.state.dataForm.zipCode.value,
            yearBuilt: this.state.dataForm.yearBuilt.value,
            inspectionDate: this.state.dataForm.inspectionDate.value
        };

        if (this.state.formIsValid) {
            this.props.toggleEdit;
            this.props.editUser(data, id);
        }
    };

    render() {
        if (this.props.add) {
            return (
                <Add display={this.props.addUser}
                     title={"Add new user"}
                     addForm={this.state.dataForm}
                     toggleAdd={this.props.toggleAddUser}
                     formIsValid={this.state.formIsValid}
                     submitData={this.addUser}
                     addFormChanged={(event) => this.changeDataFormHandler(event)}/>
            );
        }
        return null;
    }
}

export default UserData;