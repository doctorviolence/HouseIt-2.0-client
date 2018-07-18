import React, {Component} from 'react';

import Building from '../components/buildings/Building';
import Add from '../components/buildings/Add';

class Buildings extends Component {
    constructor() {
        super();

        this.addToBuildings = this.addToBuildings.bind(this);
        this.removeBuilding = this.removeBuilding.bind(this);

        this.state = {
            buildings: []
        }
    }

    shouldComponentUpdate(nextProps) {
        return nextProps.buildings !== this.state.buildings;
    }

    getBuildings = () => {
        // add api call here
    };

    addToBuildings = (building) => {
        // add api call here
        const newBuildings = [...this.state.buildings];
        newBuildings.push(building);
        this.setState({buildings: newBuildings});
        console.log('Building added');
    };

    removeBuilding = (id) => {
        // add api call here
        const buildings = [...this.state.buildings];
        const updated = buildings.filter(el => {
            return el.id !== id;
        });
        this.setState({buildings: updated});
    };

    render() {
        return (
            <div>
                <h1>Buildings</h1>
                <Building buildings={this.state.buildings} getBuildings={this.getBuildings}/>
                <Add addToBuildings={this.addToBuildings}></Add>
            </div>
        );
    }
}

export default Buildings;