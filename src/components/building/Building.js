import React from 'react';
import styled from "styled-components";

const BuildingContainer = styled.div`
    width: 200px;
    height: 250px;
    max-width: 200px;
    max-height: 250px;
    margin-right: 40px;
    margin-bottom: 40px;
    display: flex;
    flex-direction: column;
    flex: 1 0 20%;
    text-align: left;
    
    @media screen and (max-width: 700px) {
        width: 200px;
        height: 250px;
        max-width: 200px;
        max-height: 250px;
    }
`;

const ImageContainer = styled.div`
    height: 200px;
    width: 200px;
    border: 1px solid #f2f2f2;
    text-align: center;
    font-size: 14px;
    font-weight: bold;
    display: flex;
    flex-direction: column;
    justify-content: center;
    cursor: pointer;
    user-select: none;
    
    @media screen and (max-width: 700px) {
        width: 200px;
        height: 200px;
        max-width: 200px;
        max-height: 200px;
    }
    
    &:hover {
        background: #f2f2f2;
    }
`;

const BuildingName = styled.div`
    font-size: 24px;
    margin-bottom: 5px;
`;

const Button = styled.div`
    color: #CC0033;
    width: 200px;
    background: #ffffff;
    text-align: left;
    border: none;
    font-size: 16px;
    cursor: pointer;
    user-select: none;
    
    @media screen and (max-width: 700px) {
        width: 100px;
    }
`;

const Building = (props) => (
    <BuildingContainer key={props.id}>
        <ImageContainer onClick={props.viewApartments}>
        </ImageContainer>
        <BuildingName>
            {props.name}
        </BuildingName>
        <Button onClick={props.clicked}>View Details</Button>
    </BuildingContainer>
);

export default Building;