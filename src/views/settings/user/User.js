import React from 'react';

import Edit from './Edit';

const user = (props) => (
    <div className="User">
        <li key={props.id}>
            <b>ID: </b>{props.id}
            <b>Username: </b>{props.username}
            <b>Password: </b>{props.password}
            <b>Role: </b>{props.role}
            <Edit/>
            <button onClick={() => this.props.removeUser(props.id)}>Remove</button>
        </li>
    </div>
);

export default user;