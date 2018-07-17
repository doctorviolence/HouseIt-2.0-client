import React, {Component} from 'react';

import styles from './assets/css/App.css';

import Home from './components/Home';
import Building from './containers/Building';

class App extends Component {
    render() {
        return (
            <div>
                <Home className={styles.App}>
                    <Building/>
                </Home>
            </div>
        );
    }
}

export default App;
