import React from 'react';

import SideBarLink from './SideBarLink';
import Backdrop from '../backdrop/Backdrop';
import styles from '../../../assets/css/sidebar.css';

const sideBar = (props) => {
    let attachedStyles = [styles.sidebar, styles.close];
    if (props.display) {
        attachedStyles = [styles.sidebar, styles.open];
    }

    return (
        <div>
            <div className={attachedStyles.join(' ')} onClick={props.closed}>
                <nav>
                    <SideBarLink isLoggedIn={props.isLoggedIn}/>
                </nav>
            </div>
            <Backdrop show={props.display} clicked={props.closed}/>
        </div>
    )
};

export default sideBar;