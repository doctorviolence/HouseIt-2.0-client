import React, {Component} from 'react';

import styles from '../assets/css/Home.css';
import Buildings from '../containers/Buildings';

class Home extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <Buildings styles={styles.Home}/>
        )
    }
}

export default Home;