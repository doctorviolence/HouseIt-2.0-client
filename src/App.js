import React, {Component} from 'react';

import styles from './assets/css/App.css';
import Home from './components/Home';

class App extends Component {
    render() {
        return (
            <div>
                <Home className={styles.App}>

                </Home>
            </div>
        );
    }
}

export default App;
