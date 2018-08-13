import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
    position: fixed;
    z-index: 100;
    width: 100%;
    height: 100%;
    top: 0;
    background-color: #333333;
    opacity: 0.1;
`;

const Backdrop = props => (
    props.show ? <Container onClick={props.clicked}></Container> : null
);

export default Backdrop;