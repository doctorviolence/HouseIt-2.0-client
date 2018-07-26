import React, {Component} from 'react';

import styles from '../../../assets/css/menu.css';

class Menu extends Component {
    render() {
        return (
            <div className={styles.menu} onClick={this.props.clicked}>
                <div></div>
                <div></div>
                <div></div>
            </div>
        );
    }
}

export default Menu;