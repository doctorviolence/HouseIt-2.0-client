import React from 'react';
import {Container} from "../constants/styles/components";
import styled from "styled-components";

const DateContainer = styled.div`
    text-align: right;
    font-size: 12px;
    user-select: none;
    
    @media screen and (max-width: 700px) {
        font-size: 10px;
    }
`;

const MessageContainer = styled.div` 
    width: 60vw;
    margin-left: ${props => props.writtenByTenant ? '10vw' : '0'}; 
    background: ${props => props.writtenByTenant ? '#f2f2f2' : '#ffffff'};  
    padding: 4px 8px;
	text-align: left;
    border: 1px solid #333333;     
    cursor: pointer;
    user-select: none;
    
    @media screen and (max-width: 700px) {
        text-align: left;
    }
`;

const TaskMessage = (props) => (
    <Container key={props.id}>
            <MessageContainer writtenByTenant={props.writtenByTenant} onClick={props.clicked}>
                {props.messageText}
                <DateContainer>
                    {props.timePosted}
                </DateContainer>
            </MessageContainer>
    </Container>
);

export default TaskMessage;