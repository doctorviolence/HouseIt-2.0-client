import React from 'react';
import {NavLink} from 'react-router-dom';

import styles from '../../../assets/css/sidebar.css';

const sideBarLink = (props) => {
    if (props.isLoggedIn) {
        return (
            <ul>
                <li><NavLink to={{pathname: '/'}} exact activeClassName="active"
                             activeStyle={{color: '#CC0033'}}>Home</NavLink></li>
                <li><NavLink to={{pathname: '/buildings'}} activeClassName="active"
                             activeStyle={{color: '#CC0033'}}>Buildings</NavLink></li>
                <li><NavLink to={{pathname: '/apartments'}} activeClassName="active"
                             activeStyle={{color: '#CC0033'}}>Apartments</NavLink></li>
                <li><NavLink to={{pathname: '/tenants'}} activeClassName="active"
                             activeStyle={{color: '#CC0033'}}>Tenants</NavLink></li>
                <li><NavLink to={{pathname: '/tasks'}} activeClassName="active"
                             activeStyle={{color: '#CC0033'}}>Tasks</NavLink></li>
                <li><NavLink to={{pathname: '/messages'}} activeClassName="active" activeStyle={{color: '#CC0033'}}>Task
                    Messages</NavLink></li>
                <li><NavLink to={{pathname: '/users'}} activeClassName="active"
                             activeStyle={{color: '#CC0033'}}>Users</NavLink></li>
                <footer className={styles.footer}>Copyright © 2018 J. Lindvall</footer>
            </ul>
        )
    }

    return (
        <div>
            <h3>Please sign in to continue</h3>
            <footer className={styles.footer}><b>Copyright © 2018 J. Lindvall</b></footer>
        </div>
    )
};

export default sideBarLink;