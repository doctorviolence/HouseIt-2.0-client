import React, {Component} from 'react';
import Edit from '../buildings/Edit';

class Building extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        const buildings = (this.props.buildings.map((b, id) => {
            return (
                <div key={id}>
                    <ul>
                        <li><b>ID: </b>{b.id}</li>
                        <li><b>Address: </b>{b.streetAddress}</li>
                        <li><b>Floor levels: </b>{b.floorLevels}</li>
                        <li><Edit/></li>
                    </ul>
                </div>
            )
        }));

        console.log(Object.prototype.toString.call(buildings));
        console.log(buildings);

        if (buildings.length !== 0) {
            return (
                <div>
                    {buildings}
                </div>
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