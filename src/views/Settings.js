import React, {Component} from 'react';
import {connect} from 'react-redux';
import styled from 'styled-components';

import * as apiActions from '../api/actions';
import * as viewActions from "./actions";
import {validation} from "../components/constants/validation";
import Forms from "../components/ui/forms/Forms";

const Container = styled.div`
    position: fixed;
    align-items: center;
    justify-content: space-between;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    width: 100vw;
    height: 100vh;
    animation: 'fadeIn' 0.3s ease-in-out;
    transition: all 0.3s ease-in-out;
    
    @keyframes fadeIn {
      0% {
         opacity: 0;
      }
    }
    
    @media screen and (max-width: 700px) {
        justify-content: center;
    }
`;

const Title = styled.h2`
    color: #444444;
    font-size: 30px;
    user-select: none;
    cursor: default;
    
    @media screen and (max-width: 700px) {
        font-size: 20px;
    }
`;

const FormContainer = styled.form`
    display: flex;
    flex-direction: column;
    width: 400px;
    margin: auto;
    font-size: 14px;
    
    @media screen and (max-width: 700px) {
        max-width: 80%;
    }
`;

const ButtonContainer = styled.div`
    width: 100%;
    top: 10px;
    display: flex;
    align-items: center;
    justify-content: space-between;
`;

const CancelButton = styled.button`
    color: #CC0033;
    background: #ffffff;
    border: none;
    font-size: 20px;
    font-weight: bold;
    cursor: pointer;
    user-select: none;
        
    @media screen and (max-width: 700px) {
        font-size: 15px;
    }
`;

const SubmitButton = styled.button`
    background: #ffffff;
    border: none;
    font-size: 20px;
    font-weight: bold;
    cursor: pointer;
    user-select: none;
    color: ${props => props.formIsValid ? '#CC0033' : '#999999'};
    pointer-events: ${props => props.formIsValid ? 'auto' : 'none'}; 
    
    @media screen and (max-width: 700px) {
        font-size: 15px;
    }
`;

const TextContainer = styled.div`
    text-align: center;
    font-size: 16px;
    margin-top: 10vh;
    margin-bottom: 10vh;
    justify-content: center;
    cursor: pointer;
    user-select: none;
    
    @media screen and (max-width: 700px) {
        font-size: 14px;
    }
`;

class Settings extends Component {
    state = {
        settingsForm: {
            oldPassword: {
                formType: 'input',
                description: 'Old password',
                formConfig: {
                    type: 'password',
                    name: 'oldPassword',
                    placeholder: 'Old password'
                },
                value: '',
                validation: {
                    required: true,
                    minLength: 8
                },
                valid: false
            },
            newPassword: {
                formType: 'input',
                description: 'New password',
                formConfig: {
                    type: 'password',
                    name: 'newPassword',
                    placeholder: 'New password'
                },
                value: '',
                validation: {
                    required: true,
                    minLength: 8
                },
                valid: false
            }
        }, formIsValid: false,
    };

    userInputHandler = (event) => {
        event.preventDefault();
        const updatedSettingsForm = {...this.state.settingsForm};
        const updatedForm = {...updatedSettingsForm[event.target.name]};
        updatedForm.value = event.target.value;
        updatedForm.valid = validation(event.target.value, updatedForm.validation);
        updatedSettingsForm[event.target.name] = updatedForm;

        let isValid = true;
        for (let i in updatedSettingsForm) {
            isValid = updatedSettingsForm[i].valid && isValid;
        }

        this.setState({settingsForm: updatedSettingsForm, formIsValid: isValid});
    };

    handleSubmit = (event) => {
        event.preventDefault();
        const oldPassword = this.state.settingsForm.oldPassword.value;
        const newPassword = this.state.settingsForm.newPassword.value;

        if (this.state.formIsValid) {
            this.props.updateUserPassword({oldPassword: oldPassword, newPassword: newPassword});
            this.props.closeFrame("Menu");
        }
    };

    render() {
        const settingsFormInputs = [];

        for (let key in this.state.settingsForm) {
            settingsFormInputs.push({
                id: key,
                config: this.state.settingsForm[key]
            });
        }

        return (
            <Container>
                <ButtonContainer>
                    <CancelButton onClick={() => this.props.closeFrame('Menu')}> ‹ Cancel</CancelButton>
                    <SubmitButton formIsValid={this.state.formIsValid}
                                  onClick={(event) => this.handleSubmit(event)}> Done</SubmitButton>
                </ButtonContainer>
                <Title>Settings</Title>
                <TextContainer>To change your password please fill out the forms below...</TextContainer>
                <FormContainer>
                    {settingsFormInputs.map(input => (
                        <Forms
                            key={input.id}
                            formType={input.config.formType}
                            formConfig={input.config.formConfig}
                            description={input.config.description}
                            value={input.config.value}
                            valid={input.config.valid}
                            changed={(event) => this.userInputHandler(event)}/>
                    ))}
                </FormContainer>
            </Container>
        );
    }
}

const mapStateToProps = state => {
    return {
        apiState: state.apiState,
        viewState: state.viewState
    };
};

const mapDispatchToProps = dispatch => {
    return {
        updateUserPassword: (passwords) => dispatch(apiActions.updateUserPassword(passwords)),
        viewPopup: (popup) => dispatch(apiActions.viewPopup(popup)),
        closeFrame: (view) => dispatch(viewActions.closeFrame(view))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Settings);
