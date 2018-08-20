import React from 'react';
import {NavLink} from 'react-router-dom';
import styled from 'styled-components';

import Menu from '../menu/Menu';

const Container = styled.div`
    position: fixed;
    z-index: 100;
    top: 0;
    right: 0;
    height: 40px;
    width: 100%;
    color: #ffffff;
    background: #0f0f12;
    font-size: 14px;
    display: flex;
    padding: 0 20px;
    box-sizing: border-box;
`;

const LinkContainer = styled.nav`
    display: flex;
    width: 100%;
    height: 40px;
    align-items: flex-end;
    list-style-type: none;
    
    @media screen and (max-width: 500px) {
      display: none;
    }
`;

const LinkNode = styled.li`
    display: flex;
`;

const Link = styled(NavLink)`
    color: #ffffff;
    text-align: center;
    font-size: 13px;
    padding: 14px 16px;
    text-decoration: none;
    &:hover {
        color: #f2f2f2;
    }
`;

const header = (props) => {
    return (
        <Container>
            <Menu display={props.display} clicked={props.toggle}/>
            <LinkContainer show={props.display}>
                <LinkNode><Link to={{pathname: '/'}} exact activeClassName="active"
                                activeStyle={{color: '#f2f2f2'}}>Home</Link></LinkNode>
                <LinkNode><Link to={{pathname: '/buildings'}} activeClassName="active"
                                activeStyle={{color: '#f2f2f2'}}>Buildings</Link></LinkNode>
                <LinkNode><Link to={{pathname: '/apartments'}} activeClassName="active"
                                activeStyle={{color: '#f2f2f2'}}>Apartments</Link></LinkNode>
                <LinkNode><Link to={{pathname: '/tenants'}} activeClassName="active"
                                activeStyle={{color: '#f2f2f2'}}>Tenants</Link></LinkNode>
                <LinkNode><Link to={{pathname: '/tasks'}} activeClassName="active"
                                activeStyle={{color: '#f2f2f2'}}>Tasks</Link></LinkNode>
                <LinkNode><Link to={{pathname: '/messages'}} activeClassName="active" activeStyle={{color: '#f2f2f2'}}>Task
                    Messages</Link></LinkNode>
                <LinkNode><Link to={{pathname: '/settings'}} activeClassName="active"
                                activeStyle={{color: '#f2f2f2'}}>Settings</Link></LinkNode>
            </LinkContainer>
        </Container>
    )
};

export default header;