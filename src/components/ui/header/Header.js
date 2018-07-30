import React from 'react';

import styles from '../../../assets/css/header.css';
import Menu from '../menu/Menu';
import Auth from '../../../containers/auth/Auth';

const header = (props) => {
    return (
        <header className={styles.header}>
            <Menu display={props.display} clicked={props.toggle}/>
            <nav>
                <Auth isLoggedIn={props.isLoggedIn} loginHandler={props.loginHandler}
                      logoutHandler={props.logoutHandler}/>
            </nav>
        </header>
    )
};

export default header;