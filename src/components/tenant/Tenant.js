import React from 'react';

const tenant = (props) => (
    <ul key={props.id} onClick={() => props.clicked()}>
        <li key={props.id}>
            <b>ID: </b>{props.id}
            <b>First Name: </b>{props.firstName}
            <b>Last name: </b>{props.lastName}
            <b>Phone No.: </b>{props.phoneNo}
            <button onClick={() => this.props.removeTenant(props.id)}>Remove</button>
        </li>
    </ul>
);

export default tenant;