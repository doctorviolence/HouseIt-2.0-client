import React from 'react';
import {Container, TextContainer, ArrowContainer} from "../constants/styles/components";

const Tenant = (props) => (
    <Container key={props.id}>
        <TextContainer onClick={props.clicked}>
            {props.firstName} {props.lastName}
            <ArrowContainer>›</ArrowContainer>
        </TextContainer>
    </Container>
);

export default Tenant;