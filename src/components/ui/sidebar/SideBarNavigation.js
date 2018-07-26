import React from 'react';

import styles from '../../../assets/css/sidebar.css';

const sideBarNavigation = (props) => {
    return (
        <ul className={styles.nav}>
            <li><a href="/">Buildings</a></li>
            <li><a href="/">Apartments</a></li>
            <li><a href="/">Tenants</a></li>
            <li><a href="/">Tasks</a></li>
            <li><a href="/">Managers</a></li>
            <li><a href="/">Users</a></li>
        </ul>
    )
};

export default sideBarNavigation;