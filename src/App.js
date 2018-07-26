import React, {Component} from 'react';

import styles from './assets/css/app.css';
import Home from './hoc/Home';

class App extends Component {
    render() {

        return (
            <div>
                <Home className={styles.App}/>
            </div>
        );
    }
}

export default App;
