import React, {Component} from 'react';
import * as api from "../../api/apiLogin";

import styles from '../../assets/css/login.css';

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
                <div className={styles.login}>
                    <form onSubmit={this.handleSubmit}>
                        <label>Username: </label>
                        <input name="username" type="text" placeholder="Username" value={this.state.username}
                               required="true"
                               onChange={this.userInputHandler}/>
                        <label>Password: </label>
                        <input name="password" type="password" placeholder="Password" value={this.state.password}
                               required="true" minLength="6"
                               onChange={this.userInputHandler}/>
                        <input className={styles["login-button"]} type="submit" value="Login"/>
                    </form>
                </div>
            );
        }
        return (
            <div className={styles.login}>
                <button className={styles["login-button"]} onClick={this.props.logoutHandler}>Logout</button>
            </div>
        );
    }
}

export default Login;
