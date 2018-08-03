import React, {Component} from 'react';
import {BrowserRouter} from 'react-router-dom';

import Home from './hoc/Home';

class App extends Component {
    state = {
        isLoggedIn: false
    };

    loginHandler = (token) => {
        localStorage.setItem('token', token);
        this.setState({isLoggedIn: true});
    };

    logoutHandler = () => {
        localStorage.removeItem('token');
        this.setState({isLoggedIn: false});
    };

    render() {
        return (
            <BrowserRouter basename="/">
                <div className="App">
                    <Home isLoggedIn={this.state.isLoggedIn} loginHandler={this.loginHandler} logoutHandler={this.logoutHandler}/>
                </div>
            </BrowserRouter>
        );
    }
}

export default App;
