import React from 'react';

import Edit from './/Edit';

const tenant = (props) => (
    <div className="Tenant">
        <li key={props.id}>
            <b>ID: </b>{props.id}
            <b>First Name: </b>{props.firstName}
            <b>Last name: </b>{props.lastName}
            <b>Phone No.: </b>{props.phoneNo}
            <Edit/>
            <button onClick={() => this.props.removeTenant(props.id)}>Remove</button>
        </li>
    </div>
);

export default tenant;