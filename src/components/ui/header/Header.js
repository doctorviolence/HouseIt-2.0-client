import React from 'react';
import styled from 'styled-components';

import Menu from '../menu/Menu';
import Login from '../../login/Login';

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

const header = (props) => {
    return (
        <Container>
            <Menu display={props.display} clicked={props.toggle}/>
                <Login isLoggedIn={props.isLoggedIn} loginHandler={props.loginHandler}
                       logoutHandler={props.logoutHandler}/>
        </Container>
    )
};

export default header;