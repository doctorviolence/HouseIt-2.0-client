import React from 'react';
import {connect} from 'react-redux';
import styled from "styled-components";
import * as viewActions from "../../../views/actions";

const Container = styled.div`
    position: fixed;
    z-index: 100;
    right: 5px;
    bottom: 5px;
    width: 320px;
    height: auto;
    margin: auto;
    background: ${props => (props.show ? 'rgba(38, 38, 38, 0.8)' : '#ffffff')};
    animation: ${props => (props.show ? 'slideOut' : 'slideIn')} 0.3s ease-in-out;
    transition: all 0.3s ease-in-out;
      
    @media screen and (max-width: 700px) {
        left: 0px;
        right: 0px;
        bottom: 0px;
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

const PopupContainer = styled.div`
    display: flex;
    justify-content: space-between;
    margin-left: 15px;
    margin-right: 15px;
`;

const PopupTitle = styled.h3`
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

const Popup = (props) => (
    <Container onClick={props.closePopup} show={props.showPopup}>
        <PopupContainer>
            <PopupTitle>{props.popupTitle}</PopupTitle>
            <CloseSymbol>&times;</CloseSymbol>
        </PopupContainer>
    </Container>
);

const mapStateToProps = state => {
    return {
        showPopup: state.viewState.showPopup,
        popupTitle: state.viewState.popupTitle
    };
};

const mapDispatchToProps = dispatch => {
    return {
        closePopup: () => dispatch(viewActions.closePopup())
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Popup);