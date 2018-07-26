import React, {Component} from 'react';

import Header from '../components/ui/header/Header';
import SideBar from '../components/ui/sidebar/SideBar';
import Buildings from '../containers/Buildings';
import Aux from './Aux';

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
                <Header toggle={this.sideBarToggleHandler}/>
                <SideBar display={this.state.displaySideBar} closed={this.sideBarClosedHandler}/>
                <Buildings/>
            </Aux>
        )
    }
}

export default Home;