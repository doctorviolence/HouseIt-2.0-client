import React from 'react';

import styles from '../../../assets/css/header.css';

const headerNavigation = (props) => {
    return (
        <ul className={styles.nav}>
            <li><label>Username: </label></li>
            <li><input /></li>
            <li><label>Password: </label></li>
            <li><input /></li>
            <li><a href="/">Login</a></li>
        </ul>
    )
};

export default headerNavigation;