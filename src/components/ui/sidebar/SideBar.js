import React from 'react';

import Aux from '../../../hoc/Aux';
import SideBarLink from './SideBarLink';
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
                    <SideBarLink className={styles.sidebar}/>
                </nav>
            </div>
        </Aux>
    )
};

export default sideBar;