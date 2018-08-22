import React, {Component} from 'react';
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import {injectGlobal} from 'styled-components';

import async from './hoc/async';
import Header from "./components/ui/header/Header";
import SideBar from "./components/ui/sidebar/SideBar";
import Welcome from "./components/ui/welcome/Welcome";
import Login from "./containers/login/Login";

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
    return import('./containers/buildings_list/Buildings');
});

const AsyncApartments = async(() => {
    return import('./containers/apartments/Apartments');
});

const AsyncTenants = async(() => {
    return import('./containers/tenants/Tenants');
});

const AsyncTasks = async(() => {
    return import('./containers/tasks_list/Tasks');
});

const AsyncMessages = async(() => {
    return import('./containers/taskMessages/TaskMessages');
});

const AsyncUsers = async(() => {
    return import('./containers/users/Users');
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
                    <Header toggle={this.sideBarToggleHandler}
                            display={this.state.displaySideBar}
                            hide={this.state.hideSideBar}/>
                    <Switch>
                        <Route path="/buildings" component={AsyncBuildings}/>
                        <Route path="/apartments" component={AsyncApartments}/>
                        <Route path="/tenants" component={AsyncTenants}/>
                        <Route path="/tasks" component={AsyncTasks}/>
                        <Route path="/messages" component={AsyncMessages}/>
                        <Route path="/users" component={AsyncUsers}/>
                        <Route path="/"
                               render={() => <Login isLoggedIn={this.state.isLoggedIn} loginHandler={this.loginHandler}
                                                    logoutHandler={this.logoutHandler}/>}/>
                    </Switch>
                    <SideBar toggle={this.sideBarToggleHandler}
                             display={this.state.displaySideBar}
                             hide={this.sideBarClosedHandler}/>
                </div>
            </BrowserRouter>
        );
    }
}

export default App;