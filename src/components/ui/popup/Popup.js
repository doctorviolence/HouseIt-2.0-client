import React from 'react';
import styled from "styled-components";

const Container = styled.div`
    position: fixed;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
`;

const PopupContainer = styled.div`
    position: absolute;
    z-index: 1000;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    margin: auto;
    background: #ffffff;
    width: 400px;
    height: 150px;
`;

const PopupTitle = styled.h2`
    margin-top: 40px;
    margin-bottom: 40px;
    color: #000000;
    font-size: 15px;
    font-weight: bold;
    
    @media screen and (max-width: 700px) {
        font-size: 15px;
    }
`;

const Backdrop = styled.div`
    position: fixed;
    z-index: 50;
    width: 100%;
    height: 100%;
    top: 0;
    background-color: #333333;
    opacity: 0.3;
`;

const Popup = props => (
    props.show ?
        <Container>
            <PopupContainer onClick={props.close}>
                <PopupTitle>{props.title}</PopupTitle>
                Click to dismiss message
            </PopupContainer>
            <Backdrop/>
        </Container>
        : null
);

export default Popup;