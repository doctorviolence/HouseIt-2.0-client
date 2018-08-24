import React, {Component} from 'react';
import {validation} from "../../components/constants/validation";
import Add from "../../components/add/Add";
import Edit from "../../components/edit/Edit";

class TaskData extends Component {
    state = {
        dataForm: {
            taskType: {
                formType: 'input',
                description: 'Type',
                formConfig: {
                    type: 'text',
                    name: 'taskType',
                    placeholder: 'Type'
                },
                value: this.props.taskType || '',
                validation: {
                    required: true
                },
                valid: false
            },
            taskStatus: {
                formType: 'input',
                description: 'Status',
                formConfig: {
                    type: 'text',
                    name: 'taskStatus',
                    placeholder: 'Status'
                },
                value: this.props.taskStatus || '',
                validation: {
                    required: true
                },
                valid: false
            },
            resolved: {
                formType: 'input',
                description: 'Resolved',
                formConfig: {
                    type: 'text',
                    name: 'resolved',
                    placeholder: 'Resolved'
                },
                value: this.props.resolved || '',
                validation: {
                    required: true
                },
                valid: false
            },
            taskDate: {
                formType: 'input',
                description: 'Date',
                formConfig: {
                    type: 'text',
                    name: 'taskDate',
                    placeholder: 'Date'
                },
                value: this.props.taskDate || '',
                validation: {
                    required: true
                },
                valid: false
            },
            fixDate: {
                formType: 'input',
                description: 'Fix Date',
                formConfig: {
                    type: 'text',
                    name: 'fixDate',
                    placeholder: 'Fix Date'
                },
                value: this.props.fixDate || '',
                validation: {
                    required: true
                },
                valid: false
            },
            tenantId: {
                formType: 'input',
                description: 'Tenant',
                formConfig: {
                    type: 'number',
                    name: 'tenantId',
                    placeholder: 'Tenant'
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

    addTask = () => {
        const data = {
            taskNo: null,
            taskType: this.state.dataForm.taskType.value,
            taskStatus: this.state.dataForm.taskStatus.value,
            resolved: this.state.dataForm.resolved.value,
            taskDate: this.state.dataForm.taskDate.value,
            fixDate: this.state.dataForm.fixDate.value,
            tenant: {tenantId: this.state.dataForm.tenantId.value}
        };

        if (this.state.formIsValid) {
            this.props.toggleAdd;
            this.props.addTask(data);
        } else {
            // Replacing this with error message, eventually...
        }
    };

    editTask = () => {
        const no = this.props.id;
        const data = {
            taskNo: no,
            taskType: this.state.dataForm.taskType.value,
            taskStatus: this.state.dataForm.taskStatus.value,
            resolved: this.state.dataForm.resolved.value,
            taskDate: this.state.dataForm.taskDate.value,
            fixDate: this.state.dataForm.fixDate.value,
            tenant: {tenantId: this.state.dataForm.tenantId.value}
        };

        if (this.state.formIsValid) {
            this.props.toggleEdit;
            this.props.editTask(data, no);
        } else {
            // Replacing this with error message, eventually...
            console.log('Form is not valid');
        }
    };

    render() {
        if (this.props.add) {
            return (
                <Add display={this.props.add}
                     title={"Add new task"}
                     addForm={this.state.dataForm}
                     toggleAdd={this.props.toggleAdd}
                     submitData={this.addTask}
                     addFormChanged={(event) => this.changeDataFormHandler(event)}/>
            );
        }
        if (this.props.edit) {
            return (
                <Edit display={this.props.edit}
                      title={"Edit task"}
                      editForm={this.state.dataForm}
                      toggleEdit={this.props.toggleEdit}
                      submitData={this.editTask}
                      editFormChanged={(event) => this.changeDataFormHandler(event)}/>
            );
        }
        return null;
    }
}

export default TaskData;