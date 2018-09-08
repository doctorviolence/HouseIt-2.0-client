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
import BuildingData from "../components/building/Data";

const ViewContainer = styled.div`
    transform: ${props => props.newFrame ? 'slideOut' : 'none'} 0.3s ease-in-out;
    animation: ${props => props.newFrame ? 'slideIn' : 'slideOut'} 0.3s ease-in-out;
    transition: all 0.3s ease-in-out;
   
    @keyframes slideOut {
        0% {
            transform: translateX(-20vw);
        }
    }
   
    @keyframes slideIn {
        100% {
            transform: translateX(100vw);
        }  
    }  
`;

// Note: the code is purely experimental and depending on performance will probably not make it in the final version...
const viewController = (name, props, newFrame) => {
    try {
        let view = null;
        switch (name) {
            case 'Buildings':
                view = <Buildings {...props}/>;
                break;
            case 'Apartments':
                view = <Apartments {...props} newFrame={newFrame}/>;
                break;
            case 'Tenants':
                view = <Tenants {...props} newFrame={newFrame}/>;
                break;
            case 'Tasks':
                view = <Tasks {...props}/>;
                break;
            case 'Messages':
                view = <Messages {...props} newFrame={newFrame}/>;
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
            view
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
        const {title, props, newFrame} = this.props.viewState.frame;
        const view = viewController(title, props, newFrame);

        if (!isLoggedIn) {
            return (
                <ViewContainer>
                    <Login/>
                </ViewContainer>
            )
        }

        return (
            <ViewContainer newFrame={newFrame}>
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