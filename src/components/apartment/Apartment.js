import React from 'react';

const apartment = (props) => (
    <ul key={props.id} onClick={() => props.clicked()}>
        <li>
            <b>ID: </b>{props.id}
            <b>Apartment No.: </b>{props.apartmentNo}
            <b>Floor no.: </b>{props.floorNo}
            <b>Size: </b>{props.size}
            <b>Rent: </b>{props.rent}
            <button onClick={() => props.removeApartment(props.id)}>Remove</button>
        </li>
    </ul>
);

export default apartment;