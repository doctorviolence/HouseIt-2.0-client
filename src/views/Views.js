import React, {Component} from 'react';
import {connect} from 'react-redux';
import styled from "styled-components";

import * as viewActions from './actions';
import Buildings from "./building_list/Buildings";
import Tasks from "./task_list/Tasks";
import Login from "./Login";
import Menu from './Menu';

const ViewContainer = styled.div``;

class Views extends Component {

    shouldComponentUpdate(nextProps, nextState) {
        return this.props.viewState.frame !== nextProps.viewState.frame;
    }

    viewSelector = (name) => {
        try {
            let view = null;
            switch (name) {
                case 'Buildings':
                    view = <Buildings/>;
                    break;
                case 'Tasks':
                    view = <Tasks/>;
                    break;
                case 'Settings':
                    view = <p>SETTINGS</p>;
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
        const view = this.viewSelector(frame);

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