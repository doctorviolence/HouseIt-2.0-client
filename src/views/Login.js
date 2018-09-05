import React, {Component} from 'react';
import {connect} from 'react-redux';
import styled from 'styled-components';

import * as viewActions from './actions';
import {validation} from "../components/constants/validation";
import Forms from "../components/ui/forms/Forms";
import Views from "./Views";

const Container = styled.div``;

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
    position: absolute;
    width: 100%;
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
    margin-bottom: 20px;
    color: #fd5c63;
    font-size: 14px;
    font-weight: bold;
`;

class Login extends Component {
    state = {
        loginForm: {
            username: {
                formType: 'input',
                description: 'Email',
                formConfig: {
                    type: 'text',
                    name: 'username',
                    placeholder: 'Username or email'
                },
                value: '',
                validation: {
                    required: true,
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
                    <Title>Welcome</Title>
                    <FormContainer>
                        {loginFormInputs.map(input => (
                            <Forms
                                key={input.id}
                                formType={input.config.formType}
                                formConfig={input.config.formConfig}
                                value={input.config.value}
                                valid={input.config.valid}
                                changed={(event) => this.userInputHandler(event)}/>
                        ))}
                        {errorMessage}
                        <LoginButton onClick={(event) => this.handleSubmit(event)}>Log in</LoginButton>
                    </FormContainer>
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
