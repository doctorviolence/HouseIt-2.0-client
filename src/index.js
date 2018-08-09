import React from 'react';
import ReactDOM from 'react-dom';
import './assets/css/index.css';
import App from './containers/App';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(<App title={"HouseIt 2.0"}/>, document.getElementById('root'));
registerServiceWorker();