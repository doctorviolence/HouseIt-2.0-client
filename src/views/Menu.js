import React, {Component} from 'react';
import {connect} from 'react-redux';
import styled from "styled-components";

import * as viewActions from './actions';

const Container = styled.div`
    justify-content: space-between;
    align-items: center;
    display: flex;
    flex-direction: column;
    transform: ${props => props.newFrame ? 'slideOut' : null} 0.3s ease-in-out;
    animation: ${props => props.newFrame ? 'slideIn' : 'slideOut'} 0.3s ease-in-out;
    transition: all 0.3s ease-in-out;
   
    @keyframes slideOut {
        0% {
            transform: translateX(-20vw);
        }
    }
   
    @keyframes slideIn {
        100% {
             opacity: 0;
             transform: translateX(100vw);
        }  
    }  
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

const Button = styled.div`
    width: 40vw;
    margin-bottom: 40px;
    color: #CC0033;
    background: #ffffff;
    font-size: 20px;
    font-weight: bold;
    display: flex;
    text-align: left;
    border-bottom: 1px solid #bdbebf;
    align-items: center;
    justify-content: space-between;
    cursor: pointer;
    user-select: none;
    
    @media screen and (max-width: 700px) {
        width: 80vw;
        font-size: 16px;
    }
`;

const ArrowContainer = styled.div`
    font-size: 30px;
    color: #bdbebf;
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
                    <Button
                        onClick={() => this.props.viewFrame('Buildings')}>Buildings <ArrowContainer>›</ArrowContainer>
                    </Button>
                    <Button onClick={() => this.props.viewFrame('Tasks')}>Tasks <ArrowContainer>›</ArrowContainer>
                    </Button>
                    <Button onClick={() => this.props.viewFrame('Settings')}>Settings <ArrowContainer>›</ArrowContainer>
                    </Button>
                    <Button onClick={this.logOutHandler}>Log out <ArrowContainer>›</ArrowContainer>
                    </Button>
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