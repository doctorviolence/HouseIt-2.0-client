import React, {Component} from 'react';

import styles from '../../../assets/css/welcome.css';

class Welcome extends Component {
    state = {
        display: true,
        hide: false,
        showText: false
    };

    componentDidMount() {
        setTimeout(() => {
            this.setState({showText: true});
        }, 300);

        setTimeout(() => {
            this.setState({hide: true});
        }, 700);

        setTimeout(() => {
            this.setState({display: false, hide: false});
        }, 1500);
    }

    render() {
        let attachedStyles = [styles.welcome, styles.display];
        if (this.state.hide) {
            attachedStyles = [styles.welcome, styles.hide];
        }

        if (this.state.display) {
            return (
                <div className={attachedStyles.join(' ')}>
                        <h1>Roth Management</h1>
                </div>
            )
        }
        else {
            return null;
        }
    }

}

export default Welcome;