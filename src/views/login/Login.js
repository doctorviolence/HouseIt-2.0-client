import React, {Component} from 'react';
import {connect} from 'react-redux';
import styled from 'styled-components';

import * as viewActions from '../actions';
import {validation} from "../../components/constants/validation";
import Forms from "../../components/ui/forms/Forms";
import Views from "../Views";

const Container = styled.div`
    position: relative;
    align-items: center;
    justify-content: space-between;
`;

const Title = styled.h2`
    color: #000000;
    font-size: 30px;
    font-weight: bold;
    margin-bottom: 50px;
    
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
    
    label {
        font-weight: bold;
        color: #000000;
    }
    
    input {
        outline: none;
        padding: 7px;
        border: 1px solid #f2f2f2;
        background: transparent;
        margin-bottom: 10px;
        
        &:focus {
            background: #f2f2f2;
        }
        &:hover {
            background: #f2f2f2;
        }
    } 
    
    @media screen and (max-width: 700px) {
        max-width: 80%;
    }
`;

const Button = styled.button`
    color: #000000;
    background: #ffffff;
    border: 1px solid #f2f2f2;
    font-size: 20px;
    font-weight: bold;
    cursor: pointer;
    user-select: none;
    
    &:hover {
        background: #f2f2f2;
    }
    
    @media screen and (max-width: 700px) {
        font-size: 15px;
    }
`;

const ErrorMessage = styled.label`
    margin-top: 20px;
    color: #CC0033;
    font-size: 12px;
    font-weight: bold;
`;

class Login extends Component {
    state = {
        loginForm: {
            username: {
                formType: 'input',
                description: 'Username',
                formConfig: {
                    type: 'text',
                    name: 'username',
                    placeholder: 'Username'
                },
                value: '',
                validation: {
                    required: true
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
            this.props.login(username, password);
        } else {
            // Replacing this with error message, eventually...
        }
    };

    render() {
        const isLoggedIn = this.props.isLoggedIn;
        const tokenExists = localStorage.getItem('token');
        const loginFormInputs = [];
        let errorMessage = null;

        if (this.props.error) {
            errorMessage = (<ErrorMessage>{this.props.error}</ErrorMessage>);
        }

        for (let key in this.state.loginForm) {
            loginFormInputs.push({
                id: key,
                config: this.state.loginForm[key]
            });
        }

        if (!isLoggedIn && !tokenExists) {
            return (
                <Container>
                    <Title>Log in</Title>
                    <FormContainer>
                        {loginFormInputs.map(input => (
                            <Forms
                                key={input.id}
                                formType={input.config.formType}
                                formConfig={input.config.formConfig}
                                value={input.config.value}
                                invalid={!input.valid}
                                description={input.config.description}
                                changed={(event) => this.userInputHandler(event)}/>
                        ))}
                        <Button onClick={(event) => this.handleSubmit(event)}>Login</Button>
                        {errorMessage}
                    </FormContainer>
                </Container>
            );
        }
        return <Container>
            <Views/>
        </Container>
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
