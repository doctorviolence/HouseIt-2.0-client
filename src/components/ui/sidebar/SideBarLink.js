import React from 'react';
import {NavLink} from 'react-router-dom';

import styles from '../../../assets/css/sidebar.css';

const sideBarLink = (props) => {
    return (
        <ul>
            <li><NavLink to={{pathname: '/'}} exact activeClassName="active"
                         activeStyle={{color: '#007AFF'}}>Home</NavLink></li>
            <li><NavLink to={{pathname: '/buildings'}} activeClassName="active"
                         activeStyle={{color: '#007AFF'}}>Buildings</NavLink></li>
            <li><NavLink to={{pathname: '/apartments'}} activeClassName="active"
                         activeStyle={{color: '#007AFF'}}>Apartments</NavLink></li>
            <li><NavLink to={{pathname: '/tenants'}} activeClassName="active"
                         activeStyle={{color: '#007AFF'}}>Tenants</NavLink></li>
            <li><NavLink to={{pathname: '/tasks'}} activeClassName="active"
                         activeStyle={{color: '#007AFF'}}>Tasks</NavLink></li>
            <li><NavLink to={{pathname: '/messages'}} activeClassName="active" activeStyle={{color: '#007AFF'}}>Task
                Messages</NavLink></li>
            <li><NavLink to={{pathname: '/users'}} activeClassName="active"
                         activeStyle={{color: '#007AFF'}}>Users</NavLink></li>
            <footer className={styles.footer}>Copyright © 2018 J. Lindvall</footer>
        </ul>
    )
};

export default sideBarLink;