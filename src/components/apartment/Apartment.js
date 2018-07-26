import React, {Component} from 'react';

import Edit from './/Edit';

class Apartment extends Component {
    render() {
        let apartments = this.props.apartments.map((a, i) => {
            return (
                <li key={i}>
                    <b>ID: </b>{a.id}
                    <b>Apartment No.: </b>{a.apartmentNo}
                    <b>Floor no.: </b>{a.floorNo}
                    <b>Size: </b>{a.size}
                    <b>Rent: </b>{a.rent}
                    <Edit/>
                    <button onClick={() => this.props.removeApartment(i)}>Remove</button>
                </li>
            )
        });

        console.log(Object.prototype.toString.call(apartments));
        console.log(apartments);

        if (apartments.length !== 0) {
            return (
                <ul>
                    {apartments}
                </ul>
            )
        }
        else {
            return (
                <p>
                    There are no apartments currently available.
                </p>
            )
        }
    }
}

export default Apartment;