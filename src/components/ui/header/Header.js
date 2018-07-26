import React, {Component} from 'react';

import styles from '../../../assets/css/header.css';
import Menu from '../menu/Menu';
import Navigation from './HeaderNavigation';

class Header extends Component {
    render() {
        return (
            <header className={styles.header}>
                <Menu clicked={this.props.toggle}/>
                <nav className={styles.nav}>
                    <Navigation/>
                </nav>
            </header>
        )
    }
}

export default Header;