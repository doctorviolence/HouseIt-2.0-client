import React from 'react';

import Edit from './Edit';

const manager = (props) => (
    <div className="Manager">
        <li key={props.id}>
            <b>ID: </b>{props.id}
            <Edit/>
            <button onClick={() => this.props.removeManager(props.id)}>Remove</button>
        </li>
    </div>
);

export default manager;