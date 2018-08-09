import React, {Component} from 'react';
import {BrowserRouter, Route, Switch} from 'react-router-dom';

import async from '../hoc/async';
import Header from "../components/ui/header/Header";
import SideBar from "../components/ui/sidebar/SideBar";
import headerStyles from "../assets/css/header.css";
import sidebarStyles from "../assets/css/sidebar.css";
import Welcome from "../components/ui/welcome/Welcome";

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
        displaySideBar: false
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
                    <Header className={headerStyles.header}
                            isLoggedIn={this.state.isLoggedIn}
                            loginHandler={this.loginHandler}
                            logoutHandler={this.logoutHandler}
                            toggle={this.sideBarToggleHandler}
                            display={this.state.displaySideBar}/>
                    <SideBar className={sidebarStyles.sidebar}
                             isLoggedIn={this.state.isLoggedIn}
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
