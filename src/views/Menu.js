import React, {Component} from 'react';
import {connect} from 'react-redux';
import styled from "styled-components";

import * as viewActions from './actions';

const Container = styled.div`
    justify-content: space-between;
    align-items: center;
    display: flex;
    flex-direction: column;
`;

const Title = styled.h2`
    margin-bottom: 50px;
    color: #444444;
    font-size: 30px;
    user-select: none;
    cursor: default;
    
    @media screen and (max-width: 700px) {
        font-size: 20px;
    }
`;

const Button = styled.button`
    width: 400px;
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

class Menu extends Component {

    logOutHandler = () => {
        this.props.logout();
        this.props.viewFrame('Login');
    };

    render() {
        const {tenant} = this.props.viewState;

        if (!tenant) {
            return (
                <Container>
                    <Title>Menu</Title>
                    <Button onClick={() => this.props.viewFrame('Buildings')}>Buildings</Button>
                    <Button onClick={() => this.props.viewFrame('Tasks')}>Tasks</Button>
                    <Button onClick={() => this.props.viewFrame('Settings')}>Settings</Button>
                    <Button onClick={this.logOutHandler}>Log out</Button>
                </Container>
            );
        }

        return (
            <Container>
                <Title>Menu</Title>
                <Button onClick={() => this.props.viewFrame('Tasks')}>Tasks</Button>
                <Button onClick={() => this.props.viewFrame('Settings')}>Settings</Button>
                <Button onClick={this.logOutHandler}>Log out</Button>
            </Container>
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
        closeFrame: (view) => dispatch(viewActions.closeFrame(view)),
        logout: () => dispatch(viewActions.logout())
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Menu);