import React, {Component} from 'react';
import {validation} from "../constants/validation";
import Add from "../add/Add";
import Edit from "../edit/Edit";

class BuildingData extends Component {
    state = {
        dataForm: {
            name: {
                formType: 'input',
                description: 'Name',
                formConfig: {
                    type: 'text',
                    name: 'name',
                    placeholder: 'Name'
                },
                value: this.props.name || '',
                validation: {
                    required: true
                },
                valid: false
            },
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
            },
            zipCode: {
                formType: 'input',
                description: 'Zip code',
                formConfig: {
                    type: 'number',
                    name: 'zipCode',
                    placeholder: 'Zip code'
                },
                value: this.props.zipCode || '',
                validation: {
                    required: true
                },
                valid: false
            },
            yearBuilt: {
                formType: 'input',
                description: 'Year built',
                formConfig: {
                    type: 'number',
                    name: 'yearBuilt',
                    placeholder: 'Year built (yyyy)'
                },
                value: this.props.yearBuilt || '',
                validation: {
                    required: true,
                    maxLength: 4
                },
                valid: false
            },
            inspectionDate: {
                formType: 'input',
                description: 'Inspection date',
                formConfig: {
                    type: 'date',
                    name: 'inspectionDate',
                    placeholder: 'Inspection date (yyyy-mm-dd)'
                },
                value: this.props.inspectionDate || '',
                validation: {
                    required: true
                },
                valid: false
            },
            image: {
                formType: 'input',
                description: 'Image',
                formConfig: {
                    type: 'file',
                    name: 'image',
                    placeholder: 'Upload an image of the building'
                },
                value: '',
                file: [],
                validation: {
                    required: false
                },
                valid: true
            },
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

        if (updatedForm.file) {
            updatedForm.file = event.target.files[0];
        }

        let isValid = true;
        for (let i in updatedDataForm) {
            isValid = updatedDataForm[i].valid && isValid;
        }

        this.setState({dataForm: updatedDataForm, formIsValid: isValid});
    };

    addBuilding = (event) => {
        event.preventDefault();
        const file = this.state.dataForm.image.file;
        const fileSelected = file != 0; // returns boolean value if file was selected or not
        const data = {
            id: null,
            name: this.state.dataForm.name.value,
            address: this.state.dataForm.streetAddress.value,
            zipCode: this.state.dataForm.zipCode.value,
            yearBuilt: this.state.dataForm.yearBuilt.value,
            inspectionDate: this.state.dataForm.inspectionDate.value,
            imageAttached: fileSelected
        };

        if (this.state.formIsValid) {
            this.props.toggleAdd;
            this.props.addBuilding(data);
        }

        if (fileSelected) {
            this.props.uploadBuildingImage(data.name, file);
            const updatedDataForm = {...this.state.dataForm};
            updatedDataForm.image.file = [];
            updatedDataForm.image.value = '';
            this.setState({dataForm: updatedDataForm}); // resets the image object
        }
    };

    editBuilding = (event) => {
        event.preventDefault();
        const file = this.state.dataForm.image.file;
        const fileSelected = file != 0;
        const id = this.props.id;
        const data = {
            buildingId: id,
            name: this.state.dataForm.name.value,
            address: this.state.dataForm.streetAddress.value,
            zipCode: this.state.dataForm.zipCode.value,
            yearBuilt: this.state.dataForm.yearBuilt.value,
            inspectionDate: this.state.dataForm.inspectionDate.value,
            imageAttached: fileSelected
        };

        if (this.state.formIsValid) {
            this.props.toggleEdit;
            this.props.editBuilding(data, id);
        }

        if (fileSelected) {
            this.props.uploadBuildingImage(data.name, file);
            const updatedDataForm = {...this.state.dataForm};
            updatedDataForm.image.file = [];
            updatedDataForm.image.value = '';
            this.setState({dataForm: updatedDataForm}); // resets the image object
        }
    };

    render() {
        if (this.props.add) {
            return (
                <Add display={this.props.add}
                     title={"Add new building"}
                     addForm={this.state.dataForm}
                     toggleAdd={this.props.toggleAdd}
                     formIsValid={this.state.formIsValid}
                     submitData={(event) => this.addBuilding(event)}
                     addFormChanged={(event) => this.changeDataFormHandler(event)}/>
            );
        }
        if (this.props.edit) {
            return (
                <Edit display={this.props.edit}
                      title={"Edit building"}
                      editForm={this.state.dataForm}
                      toggleEdit={this.props.toggleEdit}
                      formIsValid={this.state.formIsValid}
                      submitData={(event) => this.editBuilding(event)}
                      editFormChanged={(event) => this.changeDataFormHandler(event)}/>
            );
        }
        return null;
    }
}

export default BuildingData;