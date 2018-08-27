import React, {Component} from 'react';
import {injectGlobal} from 'styled-components';

import Welcome from "./components/ui/welcome/Welcome";
import Login from "./views/Login";

injectGlobal`
   body {
        padding: 0;
        text-align: center;
        margin-top: 72px;
        background-color: #ffffff;
        font-family: "Helvetica Neue", Helvetica Neue;
        font-size: 14px;
   }
`;

class App extends Component {
    render() {
        return (
            <div className="App">
                <Welcome/>
                <Login/>
            </div>
        );
    }
}

export default App;
