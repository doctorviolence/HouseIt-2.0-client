import React, {Component} from 'react';

import Edit from './/Edit';

class Building extends Component {
    render() {
        let buildings = this.props.buildings.map((b, i) => {
            return (
                <li key={i}>
                    <b>ID: </b>{b.id}
                    <b>Address: </b>{b.streetAddress}
                    <b>Floor levels: </b>{b.floorLevels}
                    <Edit/>
                    <button onClick={() => this.props.removeBuilding(i)}>Remove</button>
                </li>
            )
        });

        console.log(Object.prototype.toString.call(buildings));
        console.log(buildings);

        if (buildings.length !== 0) {
            return (
                <ul>
                    {buildings}
                </ul>
            )
        }
        else {
            return (
                <p>
                    There are no buildings currently available.
                </p>
            )
        }
    }
}

export default Building;