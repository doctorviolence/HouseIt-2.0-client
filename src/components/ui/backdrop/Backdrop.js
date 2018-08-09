import React from 'react';

import styles from '../../../assets/css/backdrop.css';

const backdrop = props => (
    props.show ? <div className={styles.backdrop} onClick={props.clicked}></div> : null
);

export default backdrop;