import React, {Component} from 'react';
import {injectGlobal} from 'styled-components';

import Views from "./views/Views";
import Welcome from "./components/ui/welcome/Welcome";

injectGlobal`
   body {
        padding: 0;
        text-align: center;
        background-color: #ffffff;
        font-family: "Helvetica", Helvetica;
        font-size: 14px;
   }
`;

class App extends Component {
    render() {
        return (
            <div className="App">
                <Welcome/>
                <Views/>
            </div>
        );
    }
}

export default App;
