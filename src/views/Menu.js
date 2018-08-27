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
    color: #000000;
    font-size: 30px;
    font-weight: bold;
    margin-bottom: 50px;
    
    @media screen and (max-width: 700px) {
        font-size: 20px;
    }
`;

const Button = styled.button`
    margin-bottom: 100px;
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
    render() {
        const {tenant} = this.props.viewState;

        if (!tenant) {
            return (
                <Container>
                    <Title>Menu</Title>
                    <Button onClick={() => this.props.viewFrame('Buildings')}>Buildings</Button>
                    <Button onClick={() => this.props.viewFrame('Tasks')}>Tasks</Button>
                    <Button onClick={() => this.props.viewFrame('Settings')}>Settings</Button>
                    <Button onClick={() => this.props.logOut()}>Log out</Button>
                </Container>
            );
        }

        return (
            <Container>
                <Title>Menu</Title>
                <Button onClick={() => this.props.viewFrame('Tasks')}>Tasks</Button>
                <Button onClick={() => this.props.viewFrame('Settings')}>Settings</Button>
                <Button onClick={() => this.props.logOut()}>Log out</Button>
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
        logOut: () => dispatch(viewActions.logout())
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Menu);