import React from 'react';

import Edit from './Edit';

const building = (props) => (
    <div className="Building">
        <li key={props.id}>
            <b>ID: </b>{props.id}
            <b>Address: </b>{props.streetAddress}
            <b>Floor levels: </b>{props.floorLevels}
            <Edit/>
            <button onClick={() => props.removeBuilding(props.id)}>Remove</button>
        </li>
    </div>
);

export default building;