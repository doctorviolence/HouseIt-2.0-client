import React from 'react';
import Auxiliary from '../hoc/Auxiliary';
import styles from '../assets/css/Home.css';

const home = (props) => (
    <Auxiliary>
        <div>Toolbar, SideDrawer, Backdrop</div>
        <main className={styles.Home}>
            {props.children}
        </main>
    </Auxiliary>
);

export default home;