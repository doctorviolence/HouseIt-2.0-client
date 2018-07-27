import React from 'react';

import Aux from '../../../hoc/Aux';
import Navigation from './SideBarNavigation';
import styles from '../../../assets/css/sidebar.css';

const sideBar = (props) => {
    let attachedStyles = [styles.sidebar, styles.close];
    if (props.display) {
        attachedStyles = [styles.sidebar, styles.open];
    }

    return (
        <Aux>
            <div className={attachedStyles.join(' ')} onClick={props.closed}>
                <nav className={styles.sidebar}>
                    <Navigation />
                </nav>
            </div>
        </Aux>
    )
};

export default sideBar;