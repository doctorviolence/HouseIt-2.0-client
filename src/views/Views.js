import React, {Component} from 'react';
import {connect} from 'react-redux';
import styled from "styled-components";

import * as viewActions from './actions';
import Buildings from "./building_list/Buildings";
import Apartments from "./apartment_list/Apartments";
import Tenants from "./tenant_list/Tenants";
import Tasks from "./task_list/Tasks";
import Messages from "./message_list/Messages";
import Login from "./Login";
import Menu from './Menu';

const ViewContainer = styled.div``;

class Views extends Component {

    shouldComponentUpdate(nextProps, nextState) {
        return this.props.viewState.frame !== nextProps.viewState.frame;
    }

    viewController = (name, parentId, subParentId) => {
        try {
            let view = null;
            switch (name) {
                case 'Buildings':
                    view = <Buildings/>;
                    break;
                case 'Apartments':
                    view = <Apartments buildingId={parentId}/>;
                    break;
                case 'Tenants':
                    view = <Tenants apartmentId={subParentId}/>;
                    break;
                case 'Tasks':
                    view = <Tasks/>;
                    break;
                case 'Messages':
                    view = <Messages taskNo={parentId}/>;
                    break;
                case 'Settings':
                    view = <Menu/>;
                    break;
                case 'Login':
                    view = <Login/>;
                    break;
                default:
                    view = <Menu/>;
            }

            return (
                <ViewContainer>
                    {view}
                </ViewContainer>
            );
        } catch (e) {
            console.log('Failed to load view ', e);
            return null;
        }
    };

    render() {
        const isLoggedIn = this.props.viewState.token !== null;
        const frame = this.props.viewState.frame;
        const parentId = this.props.viewState.parentId;
        const subParentId = this.props.viewState.subParentId;
        const view = this.viewController(frame, parentId, subParentId);

        if (!isLoggedIn) {
            return (<Login/>)
        }

        return (
            <ViewContainer>
                {view}
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
        viewFrame: (view) => dispatch(viewActions.viewFrame(view)),
        closeFrame: (view) => dispatch(viewActions.closeFrame(view))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Views);