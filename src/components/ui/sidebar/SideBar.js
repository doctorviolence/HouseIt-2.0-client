import React from 'react';
import styled from 'styled-components';

import SideBarLink from './SideBarLink';
import Backdrop from '../backdrop/Backdrop';

const Container = styled.div`
    position: fixed;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    display: ${props => props.show ? 'open' : 'none'};
`;

const SideBarContainer = styled.div`
    position: absolute;
    z-index: 1000;
    width: 300px;
    max-width: 100%;
    height: 100%;
    justify-content: center;
    align-items: center;
    background: #ffffff;
    animation: ${props => props.show ? 'open' : 'closed'} 0.5s;
    
    @keyframes open {
        0% {
            transform: translateX(-100%);
        }
    }
    
    @keyframes closed {
        100% {
            transform: translateX(100%);
        }
    }
`;

const LinkContainer = styled.nav`
    width: 100%;
    height: 100%;
    list-style-type: none;
`;

const SideBar = (props) => {
    return (
        <Container show={props.display} onClick={props.toggle}>
            <SideBarContainer show={props.display}>
                <LinkContainer>
                    <SideBarLink isLoggedIn={props.isLoggedIn}/>
                </LinkContainer>
            </SideBarContainer>
            <Backdrop show={props.display} clicked={props.closed}/>
        </Container>
    )
};

export default SideBar;