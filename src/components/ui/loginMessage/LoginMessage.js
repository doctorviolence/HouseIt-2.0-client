import React from 'react';
import {connect} from 'react-redux';
import styled from "styled-components";
import * as viewActions from "../../../views/actions";

const Container = styled.div`
    position: fixed;
    z-index: 1000;
    right: 5px;
    bottom: 5px;
    width: 50vw;
    height: auto;
    margin: auto;
    background: ${props => (props.show ? 'rgba(204, 0, 51, 0.9)' : '#ffffff')};
    animation: ${props => (props.show ? 'slideOut' : 'slideIn')} 0.3s ease-in-out;
    transition: all 0.3s ease-in-out;
      
    @media screen and (max-width: 700px) {
        left: 0px;
        right: 0px;
        bottom: 0px;
        width: 90vw;
    }
    
    @keyframes slideOut {
      0% {
         transform: translateX(100vw);
      }
   }
   
    @keyframes slideIn {
      100% {
         transform: translateX(100vw);
      }
    }
`;

const ErrorContainer = styled.div`
    display: flex;
    justify-content: space-between;
    margin-left: 15px;
    margin-right: 15px;
`;

const ErrorTitle = styled.h3`
    color: #ffffff;
    font-size: 15px;
    font-weight: bold;
    
    @media screen and (max-width: 700px) {
        font-size: 15px;
    }
`;

const CloseSymbol = styled.div`
    color: #ffffff;
    font-size: 15px;
    font-weight: bold;
`;

const LoginError = (props) => (
    props.showError ? <Container onClick={props.closeLoginError} show={props.showError}>
            <ErrorContainer>
                <ErrorTitle>{props.error}</ErrorTitle>
                <CloseSymbol>&times;</CloseSymbol>
            </ErrorContainer>
        </Container>
        : null
);

const mapStateToProps = state => {
    return {
        showError: state.viewState.showLoginError,
        error: state.viewState.loginError,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        closeLoginError: () => dispatch(viewActions.closeLoginError())
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(LoginError);