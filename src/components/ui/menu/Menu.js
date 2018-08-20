import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
    display: flex;
    flex-flow: column;
    width: 35px;
    height: 100%;
    justify-content: space-around;
    align-items: center;
    padding: 10px 0;
    box-sizing: border-box;
    cursor: pointer;
    animation: ${props => props.show ? 'open' : 'closed'} 0.5s;
    
    @keyframes open {
        0% {
            transform: translateY(-100%);
        }
    }
    
    @keyframes closed {
        100% {
            transform: translateY(-100%);
        }
    }
    
    @media screen and (min-width: 500px) {
      display: none;
    }
`;

const MenuNode = styled.div`
    width: 90%;
    height: 2px;
    background-color: #ffffff;
`;

const menu = (props) => {
    return (
        <Container show={props.display} onClick={props.clicked}>
            <MenuNode></MenuNode>
            <MenuNode></MenuNode>
        </Container>
    );
};

export default menu;