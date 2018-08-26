import React, {Component} from 'react';
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import {injectGlobal} from 'styled-components';

import async from './hoc/async';
import Header from "./components/ui/header/Header";
import SideBar from "./components/ui/sidebar/SideBar";
import Welcome from "./components/ui/welcome/Welcome";
import Login from "./views/login/Login";

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
    return import('./views/building_list/Buildings');
});

const AsyncApartments = async(() => {
    return import('./views/apartment_list/Apartments');
});

const AsyncTenants = async(() => {
    return import('./views/tenant_list/Tenants');
});

const AsyncTasks = async(() => {
    return import('./views/task_list/Tasks');
});

const AsyncMessages = async(() => {
    return import('./views/message_list/Messages');
});

const AsyncUsers = async(() => {
    return import('./views/settings/users/Users');
});

class App extends Component {
    state = {
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
                               render={() => <Login/>}/>
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
