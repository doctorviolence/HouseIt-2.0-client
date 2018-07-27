import React from 'react';

import Edit from './Edit';

const apartment = (props) => (
    <div className="Apartment">
        <li key={props.id}>
            <b>ID: </b>{props.id}
            <b>Apartment No.: </b>{props.apartmentNo}
            <b>Floor no.: </b>{props.floorNo}
            <b>Size: </b>{props.size}
            <b>Rent: </b>{props.rent}
            <Edit/>
            <button onClick={() => props.removeApartment(props.id)}>Remove</button>
        </li>
    </div>
);

export default apartment;