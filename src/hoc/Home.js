import React, {Component} from 'react';
import {Route, Switch} from 'react-router-dom';

import Header from '../components/ui/header/Header';
import SideBar from '../components/ui/sidebar/SideBar';
import Aux from './Aux';
import async from './async';
import headerStyles from '../assets/css/header.css';
import sidebarStyles from '../assets/css/sidebar.css';

const AsyncBuildings = async(() => {
    return import('../containers/Buildings');
});

const AsyncApartments = async(() => {
    return import('../containers/Apartments');
});

const AsyncTenants = async(() => {
    return import('../containers/Tenants');
});

const AsyncTasks = async(() => {
    return import('../containers/Tasks');
});

const AsyncMessages = async(() => {
    return import('../containers/TaskMessages');
});

const AsyncUsers = async(() => {
    return import('../containers/Users');
});

class Home extends Component {
    state = {
        displaySideBar: false,
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
            <Aux>
                <Header className={headerStyles.header}
                        isLoggedIn={this.props.isLoggedIn}
                        loginHandler={this.props.loginHandler}
                        logoutHandler={this.props.logoutHandler}
                        toggle={this.sideBarToggleHandler}
                        display={this.state.displaySideBar}/>
                <SideBar className={sidebarStyles.sidebar}
                         display={this.state.displaySideBar}
                         closed={this.sideBarClosedHandler}/>
                <Switch>
                    <Route path="/buildings" component={AsyncBuildings}/>
                    <Route path="/apartments" component={AsyncApartments}/>
                    <Route path="/tenants" component={AsyncTenants}/>
                    <Route path="/tasks" component={AsyncTasks}/>
                    <Route path="/messages" component={AsyncMessages}/>
                    <Route path="/users" component={AsyncUsers}/>
                    <Route path="/" render={() => <section><p>Home page</p></section>}/>
                </Switch>
            </Aux>
        )
    }
}

export default Home;