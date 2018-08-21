import React, {Component} from 'react';
import * as api from "../../api/login/apiLogin";
import styled from 'styled-components';

const Container = styled.div`
    position: relative;
    align-items: center;
    justify-content: space-between;
    background: #ffffff;
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

class Login extends Component {
    constructor() {
        super();
        this.state = {
            username: '',
            password: ''
        };

        this.handleSubmit = this.handleSubmit.bind(this);
        this.userInputHandler = this.userInputHandler.bind(this);
        this.login = this.login.bind(this);
    }

    userInputHandler = (event) => {
        const value = event.target.value;
        const name = event.target.name;

        this.setState(
            {
                [name]: value
            }
        );
    };

    handleSubmit = (event) => {
        event.preventDefault();

        const userCredentials = {
            username: this.state.username,
            password: this.state.password
        };

        this.login(userCredentials);

        this.setState({username: '', password: ''})
    };

    login = (userCredentials) => {
        api.login(userCredentials).then(result => {
                if (result.status === 401) {
                    console.log('Invalid credentials!');
                    return;
                }

                const token = result.headers.authorization;
                this.props.loginHandler(token);
            }
        ).catch(e => {
            console.log(e);
        });
    };

    render() {
        if (!this.props.isLoggedIn) {
            return (
                <Container>
                    <Title>Log in</Title>
                    <FormContainer onSubmit={this.handleSubmit}>
                        <label>Username: </label>
                        <input name="username" type="text" placeholder="Username" value={this.state.username}
                               required="true"
                               onChange={this.userInputHandler}/>
                        <label>Password: </label>
                        <input name="password" type="password" placeholder="Password" value={this.state.password}
                               required="true" minLength="6"
                               onChange={this.userInputHandler}/>
                        <input type="submit" value="Sign in"/>
                    </FormContainer>
                </Container>
            );
        }
        return (
            <Container>
                <Title>You are now logged in.</Title>
            </Container>
        );
    }
}

export default Login;
