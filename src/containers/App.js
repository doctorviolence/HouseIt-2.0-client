import React, {Component} from 'react';
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import {injectGlobal} from 'styled-components';

import async from '../hoc/async';
import Header from "../components/ui/header/Header";
import SideBar from "../components/ui/sidebar/SideBar";
import Welcome from "../components/ui/welcome/Welcome";

injectGlobal`
   body {
        padding: 0;
        text-align: center;
        margin-top: 72px;
        background-color: #ffffff;
        font-family: "Helvetica Neue", Helvetica Neue;
        font-size: 14px;
   }
`;

const AsyncBuildings = async(() => {
    return import('./Buildings');
});

const AsyncApartments = async(() => {
    return import('./Apartments');
});

const AsyncTenants = async(() => {
    return import('./Tenants');
});

const AsyncTasks = async(() => {
    return import('./Tasks');
});

const AsyncMessages = async(() => {
    return import('./TaskMessages');
});

const AsyncUsers = async(() => {
    return import('./Users');
});

class App extends Component {
    state = {
        isLoggedIn: false,
        displaySideBar: false,
        hideSideBar: true
    };

    sideBarClosedHandler = () => {
        this.setState({displaySideBar: false})
    };

    sideBarToggleHandler = () => {
        this.setState((prevState) => {
            return {displaySideBar: !prevState.displaySideBar};
        });
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
                <div>
                    <Welcome/>
                    <Header isLoggedIn={this.state.isLoggedIn}
                            loginHandler={this.loginHandler}
                            logoutHandler={this.logoutHandler}
                            toggle={this.sideBarToggleHandler}
                            display={this.state.displaySideBar}/>
                    <SideBar isLoggedIn={this.state.isLoggedIn}
                             toggle={this.sideBarToggleHandler}
                             display={this.state.displaySideBar}
                             closed={this.sideBarClosedHandler}/>
                    <Switch>
                        <Route path="/buildings" component={AsyncBuildings}/>
                        <Route path="/apartments" component={AsyncApartments}/>
                        <Route path="/tenants" component={AsyncTenants}/>
                        <Route path="/tasks" component={AsyncTasks}/>
                        <Route path="/messages" component={AsyncMessages}/>
                        <Route path="/users" component={AsyncUsers}/>
                        <Route path="/" render={() => <div><p>Home page</p></div>}/>
                    </Switch>
                </div>
            </BrowserRouter>
        );
    }
}

export default App;
