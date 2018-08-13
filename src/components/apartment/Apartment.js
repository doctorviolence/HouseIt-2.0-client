import React from 'react';
import styled from "styled-components";

const Container = styled.div`
    width: 80%;
    margin: 20px auto;
    padding: 20px;
    border: 1px solid #f2f2f2;
    text-align: center;
    display: flex;
`;

const TextContainer = styled.li`
    width: 80%;
    margin: auto;
    text-align: center;
    display: flex;
    align-items: center;
    justify-content: space-between;
`;

const Button = styled.div`
    color: #CC0033;
    background: #ffffff;
    border-bottom: 1px solid #333333;
    cursor: pointer;
    
    &:hover {
      background: #f2f2f2;
   }
`;

const apartment = (props) => (
    <Container key={props.id}>
        <TextContainer>
            <b>ID: </b>{props.id}
            <b>Apartment No.: </b>{props.apartmentNo}
            <b>Floor no.: </b>{props.floorNo}
            <b>Size: </b>{props.size}
            <b>Rent: </b>{props.rent}
            <Button onClick={() => props.clicked()}>Edit</Button>
            <Button onClick={() => props.removeApartment(props.id)}>Remove</Button>
        </TextContainer>
    </Container>
);

export default apartment;