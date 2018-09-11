import React, {Component} from 'react';
import {connect} from 'react-redux';
import {validation} from "../constants/validation";
import Add from "../add/Add";
import * as apiActions from "../../api/actions";
import * as viewActions from "../../views/actions";

class MessageData extends Component {
    state = {
        dataForm: {
            messageText: {
                formType: 'textarea',
                description: 'Message 0/250',
                formConfig: {
                    type: 'textarea',
                    name: 'messageText',
                    placeholder: 'Message'
                },
                value: this.props.messageText || '',
                validation: {
                    required: true,
                    maxLength: 250
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
        updatedForm.description = 'Message ' + event.target.value.length + '/250';
        updatedForm.value = event.target.value;
        updatedForm.valid = validation(event.target.value, updatedForm.validation);
        updatedDataForm[event.target.name] = updatedForm;

        let isValid = true;
        for (let i in updatedDataForm) {
            isValid = updatedDataForm[i].valid && isValid;
        }

        this.setState({dataForm: updatedDataForm, formIsValid: isValid});
    };

    addTaskMessage = (event) => {
        event.preventDefault();
        const d = new Date();
        const month = d.getMonth() + 1;
        const datePosted = d.getFullYear() + "-" + month + "-" + d.getDate();
        const isTenant = this.props.viewState.tenant !== null;
        const data = {
            messageNo: null,
            datePosted: datePosted,
            timePosted: datePosted + " " + d.getHours() + ":" + d.getMinutes() + ":" + d.getSeconds(),
            messageText: this.state.dataForm.messageText.value,
            writtenByTenant: isTenant,
            task: this.props.task
        };
        if (this.state.formIsValid) {
            this.props.toggleAdd;
            this.props.addTaskMessage(data);
        } else {
            // Replacing this with error message, eventually...
        }
    };

    render() {
        if (this.props.add) {
            return (
                <Add display={this.props.add}
                     title={"Write new message"}
                     addForm={this.state.dataForm}
                     toggleAdd={this.props.toggleAdd}
                     formIsValid={this.state.formIsValid}
                     submitData={this.addTaskMessage}
                     addFormChanged={(event) => this.changeDataFormHandler(event)}/>
            );
        }

        return null;
    }
}

const mapStateToProps = state => {
    return {
        viewState: state.viewState
    };
};

export default connect(mapStateToProps)(MessageData);