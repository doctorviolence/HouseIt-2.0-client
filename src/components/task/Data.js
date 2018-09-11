import React, {Component} from 'react';
import {validation} from "../../components/constants/validation";
import Add from "../../components/add/Add";

class TaskData extends Component {
    state = {
        dataForm: {
            subject: {
                formType: 'input',
                description: 'Subject',
                formConfig: {
                    type: 'text',
                    name: 'subject',
                    placeholder: 'Subject'
                },
                value: this.props.subject || '',
                validation: {
                    required: true
                },
                valid: false
            },
            datePosted: {
                formType: 'input',
                description: 'Date',
                formConfig: {
                    type: 'date',
                    name: 'datePosted',
                    placeholder: 'Date'
                },
                value: this.props.datePosted || '',
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

    addTask = (event) => {
        event.preventDefault();
        const data = {
            taskNo: null,
            subject: this.state.dataForm.subject.value,
            resolved: false,
            datePosted: this.state.dataForm.datePosted.value,
            tenant: {tenantId: this.props.tenant},
            apartment: {apartmentId: this.props.apartment},
            building: {buildingId: this.props.building}
        };

        if (this.state.formIsValid) {
            this.props.toggleAdd;
            this.props.addTask(data);
        } else {
            // Replacing this with error message, eventually...
        }
    };

    render() {
        if (this.props.add) {
            return (
                <Add display={this.props.add}
                     title={"Add new task"}
                     addForm={this.state.dataForm}
                     formIsValid={this.state.formIsValid}
                     toggleAdd={this.props.toggleAdd}
                     submitData={this.addTask}
                     addFormChanged={(event) => this.changeDataFormHandler(event)}/>
            );
        }
        return null;
    }
}

export default TaskData;