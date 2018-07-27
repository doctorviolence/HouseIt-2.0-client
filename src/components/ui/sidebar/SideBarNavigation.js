import React from 'react';

import styles from '../../../assets/css/sidebar.css';

const sideBarNavigation = (props) => {
    return (
        <ul>
            <li><a href="/">Buildings</a></li>
            <li><a href="/">Apartments</a></li>
            <li><a href="/">Tenants</a></li>
            <li><a href="/">Tasks</a></li>
            <li><a href="/">Task Messages</a></li>
            <li><a href="/">Managers</a></li>
            <li><a href="/">Users</a></li>
            <footer className={styles.footer}>Copyright © 2018 J. Lindvall</footer>
        </ul>
    )
};

export default sideBarNavigation;