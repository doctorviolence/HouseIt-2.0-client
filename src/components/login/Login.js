import React, {Component} from 'react';
import * as api from "../../api/apiLogin";
import styled from 'styled-components';

const Container = styled.div`
    position: absolute;
    z-index: 90;
    margin: auto;
    padding: 10px;
    right: 100px;
    height: 40px;
    width: 400px;
    background-color: #0f0f12;
    box-sizing: border-box;
    display: flex;
    align-items: center;
    justify-content: center;
`;

const LoginContainer = styled.form`
    display: flex;
    margin-right: 0;
    align-items: center;
    justify-content: space-between;
`;

const Label = styled.label`
    color: #ffffff;
    font-size: 12px;
`;

const LogoutButton = styled.button`
    margin-right: 0;
    border: none;
    background-color: transparent;
    cursor: pointer;
    outline: none;
    color: #ffffff;
    font-size: 12px;
    width: 100%;
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
                <Container isLoggedIn={this.props.isLoggedIn}>
                    <LoginContainer onSubmit={this.handleSubmit}>
                        <Label>Username: </Label>
                        <input name="username" type="text" placeholder="Username" value={this.state.username}
                               required="true"
                               onChange={this.userInputHandler}/>
                        <Label>Password: </Label>
                        <input name="password" type="password" placeholder="Password" value={this.state.password}
                               required="true" minLength="6"
                               onChange={this.userInputHandler}/>
                        <input type="submit" value="Sign in"/>
                    </LoginContainer>
                </Container>
            );
        }
        return (
            <Container>
                <LogoutButton onClick={this.props.logoutHandler}>Logout</LogoutButton>
            </Container>
        );
    }
}

export default Login;
