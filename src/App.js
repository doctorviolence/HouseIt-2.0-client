import React, {Component} from 'react';
import {BrowserRouter} from 'react-router-dom';

import Home from './hoc/Home';

class App extends Component {
    render() {
        return (
            <BrowserRouter basename="/">
                <div className="App">
                    <Home/>
                </div>
            </BrowserRouter>
        );
    }
}

export default App;
