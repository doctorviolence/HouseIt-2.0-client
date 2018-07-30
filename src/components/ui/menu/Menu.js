import React from 'react';

import styles from '../../../assets/css/menu.css';

const menu = (props) => {
    if (!props.display) {
        return (
            <div className={styles.menu} onClick={props.clicked}>
                <div className={styles.open}></div>
                <div className={styles.open}></div>
            </div>
        );
    } else {
        return (
            <div className={styles.menu} onClick={props.clicked}>
                <div className={styles.closed}></div>
                <div className={styles.closed}></div>
            </div>
        );
    }

};

export default menu;