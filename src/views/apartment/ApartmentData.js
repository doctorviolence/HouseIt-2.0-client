import React, {Component} from 'react';
import {validation} from "../../components/constants/validation";
import Add from "../../components/add/Add";
import Edit from "../../components/edit/Edit";

class apartmentData extends Component {
    state = {
        dataForm: {
            apartmentNo: {
                formType: 'input',
                description: 'Apartment No.',
                formConfig: {
                    type: 'text',
                    name: 'apartmentNo',
                    placeholder: 'Apartment No.'
                },
                value: this.props.apartmentNo || '',
                validation: {
                    required: true
                },
                valid: false
            },
            size: {
                formType: 'input',
                description: 'Size',
                formConfig: {
                    type: 'text',
                    name: 'size',
                    placeholder: 'Size'
                },
                value: this.props.size || '',
                validation: {
                    required: true
                },
                valid: false
            },
            rent: {
                formType: 'input',
                description: 'Rent',
                formConfig: {
                    type: 'text',
                    name: 'rent',
                    placeholder: 'Rent'
                },
                value: this.props.rent || '',
                validation: {
                    required: true
                },
                valid: false
            },
            floorNo: {
                formType: 'input',
                description: 'Floor No.',
                formConfig: {
                    type: 'text',
                    name: 'floorNo',
                    placeholder: 'Floor No.'
                },
                value: this.props.floorNo || '',
                validation: {
                    required: true
                },
                valid: false
            },
            buildingId: {
                formType: 'input',
                description: 'Building',
                formConfig: {
                    type: 'number',
                    name: 'buildingId',
                    placeholder: 'Building'
                },
                value: '',
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

    addApartment = () => {
        const data = {
            apartmentId: null,
            apartmentNo: this.state.dataForm.apartmentNo.value,
            rent: this.state.dataForm.rent.value,
            size: this.state.dataForm.size.value,
            floorNo: this.state.dataForm.floorNo.value,
            fixDate: this.state.dataForm.fixDate.value,
            building: {buildingId: this.state.dataForm.buildingId.value}
        };

        if (this.state.formIsValid) {
            this.props.toggleAdd;
            this.props.addApartment(data);
        } else {
            // Replacing this with error message, eventually...
        }
    };

    editApartment = () => {
        const id = this.props.id;
        const data = {
            apartmentId: id,
            apartmentNo: this.state.dataForm.apartmentNo.value,
            rent: this.state.dataForm.rent.value,
            size: this.state.dataForm.size.value,
            floorNo: this.state.dataForm.floorNo.value,
            fixDate: this.state.dataForm.fixDate.value,
            building: {buildingId: this.state.dataForm.buildingId.value}
        };

        if (this.state.formIsValid) {
            this.props.toggleEdit;
            this.props.editApartment(data, id);
        } else {
            // Replacing this with error message, eventually...
            console.log('Form is not valid');
        }
    };

    render() {
        if (this.props.add) {
            return (
                <Add display={this.props.add}
                     title={"Add new apartment"}
                     addForm={this.state.dataForm}
                     toggleAdd={this.props.toggleAdd}
                     submitData={this.addApartment}
                     addFormChanged={(event) => this.changeDataFormHandler(event)}/>
            );
        }
        if (this.props.edit) {
            return (
                <Edit display={this.props.edit}
                      title={"Edit apartment"}
                      editForm={this.state.dataForm}
                      toggleEdit={this.props.toggleEdit}
                      submitData={this.editApartment}
                      editFormChanged={(event) => this.changeDataFormHandler(event)}/>
            );
        }
        return null;
    }
}

export default apartmentData;