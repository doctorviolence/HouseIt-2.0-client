import React, {Component} from 'react';
import {connect} from 'react-redux';
import styled from "styled-components";

import * as viewActions from './actions';
import Buildings from "./building_list/Buildings";
import Tasks from "./task_list/Tasks";

/*const Container = styled.div`
    position: relative;
    align-items: center;
    justify-content: space-between;
`;*/

const ViewContainer = styled.div``;

const Button = styled.button`
    color: #CC0033;
    background: #ffffff;
    border: none;
    font-size: 20px;
    font-weight: bold;
    cursor: pointer;
    user-select: none;
    
    @media screen and (max-width: 700px) {
        font-size: 15px;
    }
`;

const frame = (view) => {
    try {
        return (
            <ViewContainer>
                {view}
            </ViewContainer>
        );
    } catch (e) {
        console.log(e);
        return null;
    }
};

class Views extends Component {
    state = {
        frames: {
            showBuildings: this.props.showBuildings,
            showTasks: this.props.showTasks,
            showSettings: this.props.showSettings
        }
    };

    shouldComponentUpdate(nextProps, nextState) {
        return this.state.frames !== this.props.frames;
    }

    viewFramesHandler = (name) => {
        this.props.viewFrame(name);
    };

    closeFramesHandler = (name) => {
        this.props.closeFrame(name);
    };

    render() {
        const {showBuildings, showTasks, showSettings} = this.props.viewState;

        // If anyone is reading this, I am truly sorry for my spaghetti code...
        let view = null;
        if (showBuildings) {
            view = frame(<Buildings onDisplay={showBuildings}
                                    goBack={() => this.closeFramesHandler('showBuildings')}/>);
        }
        if (showTasks) {
            view = frame(<Tasks onDisplay={showBuildings} goBack={() => this.closeFramesHandler('showTasks')}/>);
        }
        if (showSettings) {
            view = frame(<p>SETTINGS</p>)
        }

        if (!this.props.isTenant) {
            return (
                <ViewContainer>
                    <Button onClick={() => this.viewFramesHandler('showBuildings')}>Buildings ></Button>
                    <Button onClick={() => this.viewFramesHandler('showTasks')}>Tasks ></Button>
                    <Button onClick={() => this.viewFramesHandler('showSettings')}>Settings ></Button>
                    {view}
                </ViewContainer>
            );
        }
        return <p>You are a tenant.</p>;
    };
}

const mapStateToProps = state => {
    return {
        isTenant: state.viewState.tenantId !== null,
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