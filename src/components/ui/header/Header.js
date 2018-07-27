import React from 'react';

import styles from '../../../assets/css/header.css';
import Menu from '../menu/Menu';
import Navigation from './HeaderNavigation';

const header = (props) => {
    return (
        <header className={styles.header}>
            <Menu display={props.display} clicked={props.toggle}/>
            <nav>
                <Navigation/>
            </nav>
        </header>
    )
};

export default header;