import React, {Component} from 'react';
import * as api from "../../api/apiLogin";

import styles from '../../assets/css/auth.css';

class Auth extends Component {
    constructor() {
        super();
        this.state = {
            username: '',
            password: ''
        };

        this.handleSubmit = this.handleSubmit.bind(this);
        this.userInputHandler = this.userInputHandler.bind(this);
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
            if (!result) {
                console.log('Invalid credentials');
            }

            const user = result.user;
            user.access_token = result.access.token;
            user.token_expiry = result.access.expires;
        });
        console.log(userCredentials);

        this.props.loginHandler();
    };

    render() {
        if (!this.props.isLoggedIn) {
            return (
                <div className={styles.auth}>
                    <form onSubmit={this.handleSubmit}>
                        <input name="username" type="text" placeholder="Username" value={this.state.username}
                               required="true"
                               onChange={this.userInputHandler}/>
                        <input name="password" type="password" placeholder="Password" value={this.state.password}
                               required="true" minLength="6"
                               onChange={this.userInputHandler}/>
                        <input className={styles["auth-button"]} type="submit" value="Login"/>
                    </form>
                </div>
            );
        } else {
            return (
                <div className={styles.auth}>
                    <button className={styles["auth-button"]} onClick={this.props.logoutHandler}>Logout</button>
                </div>
            )
        }
    }
}

export default Auth;
