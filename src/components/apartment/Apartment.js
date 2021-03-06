import React from 'react';
import styled from "styled-components";
import {Button} from "../constants/styles/components";

const Container = styled.div`
    width: 80vw;
    padding: 24px;
    display: flex;
    align-items: center;
    
    @media screen and (max-width: 700px) {
        width: 80vw;
        flex-direction: column;
    }
`;

const ApartmentContainer = styled.div`
    width: 60vw;
    display: flex;
    text-align: left;
    font-size: 24px;
    margin-bottom: 5px;
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

const Apartment = (props) => (
    <Container key={props.id}>
        <ApartmentContainer onClick={props.viewTenants}>
            {props.apartmentNo}
            <ArrowContainer>›</ArrowContainer>
        </ApartmentContainer>
        <Button onClick={props.clicked}>View Details</Button>
    </Container>
);

export default Apartment;