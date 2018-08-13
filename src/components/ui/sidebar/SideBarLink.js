import React from 'react';
import {NavLink} from 'react-router-dom';
import styled from 'styled-components';

const Container = styled.div`
    position: relative;
    z-index: 200;
    left: 0;
    top: 0;
    margin-top: 48px;
    align-content: center;
`;

const LinkNode = styled.li`
      display: flex;
`;

const Link = styled(NavLink)`
    display: block;
    color: #000000;
    text-align: center;
    font-size: 20px;
    font-weight: bold;
    padding: 14px 16px;
    text-decoration: none;
    &:hover {
        color: #CC0033;
    }
`;

const sideBarLink = (props) => {
    if (props.isLoggedIn) {
        return (
            <Container>
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
                <LinkNode><Link to={{pathname: '/messages'}} activeClassName="active" activeStyle={{color: '#CC0033'}}>Task
                    Messages</Link></LinkNode>
                <LinkNode><Link to={{pathname: '/settings'}} activeClassName="active"
                                activeStyle={{color: '#CC0033'}}>Settings</Link></LinkNode>
            </Container>
        )
    }

    return (
        null
    )
};

export default sideBarLink;