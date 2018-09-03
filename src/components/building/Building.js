import React from 'react';
import styled from "styled-components";
import {Button} from "../constants/styles/components";

const BuildingContainer = styled.div`
    width: 200px;
    max-width: 200px;
    height: 200px;
    max-height: 200px;
    margin-right: 40px;
    margin-bottom: 40px;
    border: 1px solid #f2f2f2;
    flex: 1 1 40%;
    justify-content: center;
    
    @media screen and (max-width: 700px) {
        width: 100px;
        max-width: 100px;
        height: 100px;
        max-height: 100px;
    }
`;

const TextContainer = styled.div`
    height: 200px;
    text-align: center;
    font-size: 14px;
    font-weight: bold;
    display: flex;
    flex-direction: column;
    justify-content: center;
    cursor: pointer;
    user-select: none;
    
    @media screen and (max-width: 700px) {
        height: 100px;
    }
    
    &:hover {
        background: #f2f2f2;
    }
`;

const Building = (props) => (
    <BuildingContainer key={props.id}>
        <TextContainer onClick={props.viewApartments}>
            {props.name}
        </TextContainer>
        <Button onClick={props.clicked}>View Details</Button>
    </BuildingContainer>
);

export default Building;