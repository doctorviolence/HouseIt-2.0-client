import React, {Component} from 'react';
import {connect} from 'react-redux';
import styled from 'styled-components';

import * as viewActions from './actions';
import {validation} from "../components/constants/validation";
import Forms from "../components/ui/forms/Forms";
import Views from "./Views";

const Container = styled.div``;

const LoginContainer = styled.div`
    position: fixed;
    left: 0;
    width: 80vw;
    height: 40vh;
    display: flex;
    align-items: center;
    justify-content: center;
    
    @media screen and (max-width: 700px) {
        flex-direction: column;
        width: 90vw;
        height: 80vh;
    }    
`;

const TextContainer = styled.div`
    width: 40vw;
    display: flex;
    flex-direction: column;
    margin-left: 10vw;
    text-align: left;
    font-size: 36px;
    cursor: pointer;
    user-select: none;
    
    @media screen and (max-width: 700px) {
        font-size: 12px;
        width: 80vw;
        margin-bottom: 5vh;
    }
`;

const Label = styled.label`
    font-size: 16px;
    font-weight: bold;
    user-select: none;
`;

const Title = styled.h2`
    color: #444444;
    font-size: 48px;
    text-align: left;
    user-select: none;
    cursor: default;
    
    @media screen and (max-width: 700px) {
        font-size: 36px;
    }
`;

const FormContainer = styled.form`
    display: flex;
    flex-direction: column;
    margin-top: 10vw;
    margin-left: 10vw;
    width: 30vw;
    font-size: 14px;
    
    @media screen and (max-width: 700px) {
        width: 80vw;
        position: relative;
        margin-top: 0;
    }
`;

const LoginButton = styled.button`
    height: 40px;
    color: #ffffff;
    background: #444444;
    font-size: 16px;
    font-weight: bold;
    cursor: pointer;
    user-select: none;
`;

const Footer = styled.footer`
    position: fixed;
    width: 100vw;
    bottom: 0;
    color: #444444;
    font-weight: bold;
    user-select: none;
    cursor: default;
    
    @media screen and (max-width: 700px) {
        font-size: 10px;
    }
`;

const ErrorMessage = styled.label`
    margin-top: 20px;
    color: #fd5c63;
    font-size: 14px;
    font-weight: bold;
`;

class Login extends Component {
    state = {
        loginForm: {
            username: {
                formType: 'input',
                description: 'Username or email',
                formConfig: {
                    type: 'text',
                    name: 'username',
                    placeholder: 'Write your username or email'
                },
                value: '',
                validation: {
                    required: true,
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
        }, formIsValid: false,
        error: false
    };

    userInputHandler = (event) => {
        event.preventDefault();
        const updatedLoginForm = {...this.state.loginForm};
        const updatedForm = {...updatedLoginForm[event.target.name]};
        updatedForm.value = event.target.value;
        updatedForm.valid = validation(event.target.value, updatedForm.validation);
        updatedLoginForm[event.target.name] = updatedForm;

        let isValid = true;
        for (let i in updatedLoginForm) {
            isValid = updatedLoginForm[i].valid && isValid;
        }

        this.setState({loginForm: updatedLoginForm, formIsValid: isValid});
    };

    handleSubmit = (event) => {
        event.preventDefault();
        const username = this.state.loginForm.username.value;
        const password = this.state.loginForm.password.value;

        if (this.state.formIsValid) {
            this.setState({error: false});
            this.props.login(username, password);
        } else {
            this.setState({error: true});
        }
    };

    render() {
        const isLoggedIn = this.props.isLoggedIn;
        //const tokenExists = localStorage.getItem('token');
        const loginFormInputs = [];
        let errorMessage = null;

        if (this.props.error) {
            errorMessage = (<ErrorMessage>{this.props.error}</ErrorMessage>);
        }

        if (this.state.error) {
            errorMessage = (<ErrorMessage>Please fill out a valid email and/or password...</ErrorMessage>);
        }

        for (let key in this.state.loginForm) {
            loginFormInputs.push({
                id: key,
                config: this.state.loginForm[key]
            });
        }

        if (!isLoggedIn) {
            return (
                <Container>
                    <LoginContainer>
                        <TextContainer>
                            <Title>Built for Roth Fastigheter</Title>
                            <Label>This application was developed to help streamline your daily work
                                process. From managing property to communicating with your 100+ tenants, you can plan
                                and
                                organize work, and respond faster to different tasks and requests.</Label>
                        </TextContainer>
                        <FormContainer>
                            {loginFormInputs.map(input => (
                                <Forms
                                    key={input.id}
                                    formType={input.config.formType}
                                    formConfig={input.config.formConfig}
                                    description={input.config.description}
                                    value={input.config.value}
                                    valid={input.config.valid}
                                    changed={(event) => this.userInputHandler(event)}/>
                            ))}
                            <LoginButton onClick={(event) => this.handleSubmit(event)}>Log in</LoginButton>
                            {errorMessage}
                        </FormContainer>
                    </LoginContainer>
                    <Footer>Copyright © 2018 Roth Fastigheter AB. All rights reserved.</Footer>
                </Container>
            );
        }
        return <Views/>
    }
}

//<Button onClick={this.props.logout}>Logout</Button>

const mapStateToProps = state => {
    return {
        isLoggedIn: state.viewState.token !== null,
        error: state.viewState.loginError
    };
};

const mapDispatchToProps = dispatch => {
    return {
        login: (username, password) => dispatch(viewActions.login(username, password)),
        logout: () => dispatch(viewActions.logout())
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
