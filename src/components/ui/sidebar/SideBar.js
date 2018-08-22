import React from 'react';
import {NavLink} from 'react-router-dom';
import styled from 'styled-components';

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
    width: 100%;
    height: 100%;
    justify-content: center;
    align-items: center;
    background: #0f0f12;
`;

const LinkContainer = styled.nav`
    width: 100%;
    height: 100%;
    list-style-type: none;
`;

const LinkNode = styled.li`
      display: flex;
`;

const Link = styled(NavLink)`
    display: block;
    color: #ffffff;
    text-align: center;
    font-size: 20px;
    font-weight: bold;
    padding: 14px 16px;
    text-decoration: none;
    &:hover {
        color: #CC0033;
    }
`;

const SideBar = (props) => {
    return (
        <Container show={props.display} onClick={props.toggle}>
            <SideBarContainer show={props.display}>
                <LinkContainer>
                    <LinkNode><Link to={{pathname: '/'}} exact activeClassName="active"
                                    activeStyle={{color: '#CC0033'}}>Home</Link></LinkNode>
                    <LinkNode><Link to={{pathname: '/buildings'}} activeClassName="active"
                                    activeStyle={{color: '#CC0033'}}>Buildings</Link></LinkNode>
                    <LinkNode><Link to={{pathname: '/apartments'}} activeClassName="active"
                                    activeStyle={{color: '#CC0033'}}>Apartments</Link></LinkNode>
                    <LinkNode><Link to={{pathname: '/tenants'}} activeClassName="active"
                                    activeStyle={{color: '#CC0033'}}>Tenants</Link></LinkNode>
                    <LinkNode><Link to={{pathname: '/tasks'}} activeClassName="active"
                                    activeStyle={{color: '#CC0033'}}>Tasks</Link></LinkNode>
                    <LinkNode><Link to={{pathname: '/messages'}} activeClassName="active"
                                    activeStyle={{color: '#CC0033'}}>Task
                        Messages</Link></LinkNode>
                    <LinkNode><Link to={{pathname: '/settings'}} activeClassName="active"
                                    activeStyle={{color: '#CC0033'}}>Settings</Link></LinkNode>
                </LinkContainer>
            </SideBarContainer>
            <Backdrop show={props.display} clicked={props.closed}/>
        </Container>
    )
};

export default SideBar;