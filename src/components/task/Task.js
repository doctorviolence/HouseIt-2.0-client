import React from 'react';
import {Container, TextContainer, ArrowContainer, Button} from "../constants/styles/components";

const Task = (props) => (
    <Container key={props.id}>
        <TextContainer onClick={props.viewMessages}>
            {props.subject}
            <ArrowContainer>›</ArrowContainer>
        </TextContainer>
        <Button onClick={props.clicked}>View Details</Button>
    </Container>
);

export default Task;