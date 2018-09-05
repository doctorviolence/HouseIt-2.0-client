import React, {Component} from 'react';
import {connect} from 'react-redux';
import styled from "styled-components";

import * as viewActions from './actions';
import Buildings from "./building_list/Buildings";
import Apartments from "./apartment_list/Apartments";
import Tenants from "./tenant_list/Tenants";
import Tasks from "./task_list/Tasks";
import Messages from "./message_list/TaskMessages";
import Login from "./Login";
import Settings from "./Settings";
import Menu from './Menu';
import Popup from "../components/ui/popup/Popup";
import ErrorMessage from "../components/ui/errorMessage/ErrorMessage";
import Welcome from "../components/ui/welcome/Welcome";

const ViewContainer = styled.div``;

const FrameContainer = styled.div`
    animation: 'fadeIn' 0.5s ease-in-out;
    transition: all 0.5s ease-in-out;
    
    @keyframes fadeIn {
      0% {
         transform: translateX(100vw);
         opacity: 0;
      }
   }
`;

// Note: the code is purely experimental and depending on performance will probably not make it in the final version...
const viewController = (name, props) => {
    try {
        let view = null;
        switch (name) {
            case 'Buildings':
                view = <Buildings {...props}/>;
                break;
            case 'Apartments':
                view = <Apartments {...props}/>;
                break;
            case 'Tenants':
                view = <Tenants {...props}/>;
                break;
            case 'Tasks':
                view = <Tasks {...props}/>;
                break;
            case 'Messages':
                view = <Messages {...props}/>;
                break;
            case 'Settings':
                view = <Settings {...props}/>;
                break;
            case 'Login':
                view = <Login {...props}/>;
                break;
            default:
                view = <Menu {...props}/>;
        }

        return (
            <FrameContainer>
                {view}
            </FrameContainer>
        );
    } catch (e) {
        console.log('Failed to load view ', e);
        return null;
    }
};

class Views extends Component {

    shouldComponentUpdate(nextProps, nextState) {
        return this.props.viewState.frame !== nextProps.viewState.frame;
    }

    render() {
        const isLoggedIn = this.props.viewState.token !== null;
        const {title, props} = this.props.viewState.frame;
        //const {showPopup, popupTitle} = this.props.viewState;
        const view = viewController(title, props);

        if (!isLoggedIn) {
            return (
                <ViewContainer>
                    <Welcome/>
                    <Login/>
                </ViewContainer>
            )
        }

        return (
            <ViewContainer>
                {view}
                <Popup/>
                <ErrorMessage/>
            </ViewContainer>
        );
    };
}

const mapStateToProps = state => {
    return {
        viewState: state.viewState
    };
};


const mapDispatchToProps = dispatch => {
    return {
        viewFrame: (view, props) => dispatch(viewActions.viewFrame(view, props)),
        closeFrame: (view, props) => dispatch(viewActions.closeFrame(view, props))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Views);