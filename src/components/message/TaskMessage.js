import React from 'react';
import styled from "styled-components";

const Container = styled.div`
    width: 90vw;
    padding: 24px;
    display: flex;
    
    @media screen and (max-width: 700px) {
        flex-direction: column;
    }
`;

const DateContainer = styled.div`
    width: 20vw;
    display: flex;
    font-size: 16px;
    align-items: center;
    justify-content: space-between;
    user-select: none;
    
    @media screen and (max-width: 700px) {
        font-size: 12px;
        width: 80vw;
        justify-content: center;
    }
`;

const ArrowContainer = styled.div`
    font-size: 30px;
    color: #bdbebf;
    
     @media screen and (max-width: 700px) {
        margin-left: 20px;
    }
`;

const TextContainer = styled.div`
    width: 90vw;
    display: flex;
    text-align: left;
    font-size: 20px;
    margin-left: 20px;
    margin-bottom: 5px;
    border-bottom: 1px dotted #bdbebf;
    align-items: center;
    justify-content: space-between;
    cursor: pointer;
    user-select: none;
    
    @media screen and (max-width: 700px) {
        width: 80vw;
        font-size: 12px;
        margin-left: 0px;
        text-align: left;
        justify-content: center;
    }
`;

const TaskMessage = (props) => (
    <Container key={props.id}>
        <DateContainer>
            {props.timePosted}
            <ArrowContainer>›</ArrowContainer>
        </DateContainer>
        <TextContainer onClick={props.clicked}>
            {props.messageText}
        </TextContainer>
    </Container>
);

export default TaskMessage;