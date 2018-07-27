import React, {Component} from 'react';

import Header from '../components/ui/header/Header';
import SideBar from '../components/ui/sidebar/SideBar';
import Buildings from '../containers/Buildings';
import Apartments from '../containers/Apartments';
import Tenants from '../containers/Tenants';
import Tasks from '../containers/Tasks';
import TaskMessages from '../containers/TaskMessages';
import Managers from '../containers/Managers';
import Users from '../containers/Users';
import Aux from './Aux';
import headerStyles from '../assets/css/header.css';
import componentStyles from '../assets/css/component.css';
import sidebarStyles from '../assets/css/sidebar.css';

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
                <Header className={headerStyles.header} toggle={this.sideBarToggleHandler}
                        display={this.state.displaySideBar}/>
                <SideBar className={sidebarStyles.sidebar} display={this.state.displaySideBar}
                         closed={this.sideBarClosedHandler}/>
                <Buildings className={componentStyles.component}/>
            </Aux>
        )
    }
}

export default Home;