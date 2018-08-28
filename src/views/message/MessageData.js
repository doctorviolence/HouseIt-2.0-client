/* eslint-disable no-unused-expressions */
import React, {Component} from 'react';
import {validation} from "../../components/constants/validation";
import Add from "../../components/add/Add";
import Edit from "../../components/edit/Edit";

class MessageData extends Component {
    state = {
        dataForm: {
            messageText: {
                formType: 'textarea',
                description: 'Message',
                formConfig: {
                    type: 'text',
                    name: 'messageText',
                    placeholder: 'Message'
                },
                value: this.props.messageText || '',
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

    addTaskMessage = () => {
        const data = {
            messageNo: null,
            messageText: this.state.dataForm.messageText.value,
            task: {taskNo: this.props.taskNo}
        };

        if (this.state.formIsValid) {
            this.props.toggleAdd;
            this.props.addTaskMessage(data);
        } else {
            // Replacing this with error message, eventually...
        }
    };

    editTaskMessage = () => {
        const no = this.props.id;
        const data = {
            messageNo: no,
            messageText: this.state.dataForm.messageText.value,
            task: {taskNo: this.props.taskNo}
        };

        this.props.toggleEdit;
        this.props.editTaskMessage(data, no);
    };

    render() {
        if (this.props.add) {
            return (
                <Add display={this.props.add}
                     title={"Write new message"}
                     addForm={this.state.dataForm}
                     toggleAdd={this.props.toggleAdd}
                     formValid={this.state.formIsValid}
                     submitData={this.addTaskMessage}
                     addFormChanged={(event) => this.changeDataFormHandler(event)}/>
            );
        }
        if (this.props.edit) {
            return (
                <Edit display={this.props.edit}
                      title={"Edit message"}
                      editForm={this.state.dataForm}
                      toggleEdit={this.props.toggleEdit}
                      submitData={this.editTaskMessage}
                      editFormChanged={(event) => this.changeDataFormHandler(event)}/>
            );
        }
        return null;
    }
}

export default MessageData;