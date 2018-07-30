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

const AsyncManagers = async(() => {
    return import('../containers/Managers');
});

const AsyncUsers = async(() => {
    return import('../containers/Users');
});

class Home extends Component {
    state = {
        displaySideBar: false,
        isLoggedIn: false
    };

    loginHandler = () => {
        // add api call here and add jwt to localstorage
        console.log('Logged in...');
        this.setState({isLoggedIn: true});
    };

    logoutHandler = () => {
        // add api call here
        console.log('Logged out...');
        this.setState({isLoggedIn: false});
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
                        isLoggedIn={this.state.isLoggedIn}
                        loginHandler={this.loginHandler}
                        logoutHandler={this.logoutHandler}
                        toggle={this.sideBarToggleHandler}
                        display={this.state.displaySideBar}/>
                <SideBar className={sidebarStyles.sidebar}
                         isLoggedIn={this.state.isLoggedIn}
                         loginHandler={this.loginHandler}
                         logoutHandler={this.logoutHandler}
                         display={this.state.displaySideBar}
                         closed={this.sideBarClosedHandler}/>
                <Switch>
                    <Route path="/buildings" component={AsyncBuildings}/>
                    <Route path="/apartments" exact component={AsyncApartments}/>
                    <Route path="/tenants" exact component={AsyncTenants}/>
                    <Route path="/tasks" exact component={AsyncTasks}/>
                    <Route path="/messages" exact component={AsyncMessages}/>
                    <Route path="/managers" exact component={AsyncManagers}/>
                    <Route path="/users" exact component={AsyncUsers}/>
                    <Route path="/" render={() => <section><p>Home page</p></section>}/>
                </Switch>
            </Aux>
        )
    }
}

export default Home;