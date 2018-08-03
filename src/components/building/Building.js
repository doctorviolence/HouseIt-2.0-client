import React from 'react';

const building = (props) => (
    <ul key={props.id} onClick={() => props.clicked()}>
        <li>
            <b>ID: </b>{props.id}
            <b>Address: </b>{props.streetAddress}
            <b>Floor levels: </b>{props.floorLevels}
            <button onClick={() => props.removeBuilding(props.id)}>Remove</button>
        </li>
    </ul>
);

export default building;