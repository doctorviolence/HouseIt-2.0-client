import React from 'react';

import Aux from '../../../hoc/Aux';
import SideBarLink from './SideBarLink';
import Backdrop from '../backdrop/Backdrop';
import styles from '../../../assets/css/sidebar.css';

const sideBar = (props) => {
    let attachedStyles = [styles.sidebar, styles.close];
    if (props.display) {
        attachedStyles = [styles.sidebar, styles.open];
    }

    return (
        <Aux>
            <div className={attachedStyles.join(' ')} onClick={props.closed}>
                <nav>
                    <SideBarLink/>
                </nav>
            </div>
            <Backdrop show={props.display} clicked={props.closed}/>
        </Aux>
    )
};

export default sideBar;