import React, {Component} from 'react';

import Building from '../components/building/Building';
import Add from '../components/building/Add';
import styles from '../assets/css/components.css';

class Buildings extends Component {
    constructor() {
        super();

        this.addToBuildings = this.addToBuildings.bind(this);
        this.removeFromBuildings = this.removeFromBuildings.bind(this);

        this.state = {
            buildings: []
        }
    }

    shouldComponentUpdate(nextProps) {
        return nextProps.buildings !== this.state.buildings;
    }

    componentDidMount() {
        this.getBuildings();
    }

    getBuildings = () => {
        // add api call here
        this.setState({buildings: this.state.buildings})
    };

    addToBuildings = (building) => {
        // add api call here
        const updated = [...this.state.buildings];
        updated.push(building);
        this.setState({buildings: updated});
        console.log('Building added');
    };

    removeFromBuildings = (id) => {
        // add api call here
        const buildings = [...this.state.buildings];
        delete buildings[id];
        const updated = buildings.filter(el => {
            return el.id !== id;
        });
        this.setState({buildings: updated});
        console.log('Building removed');
    };

    render() {
        return (
            <div>
                <h1>Buildings</h1>
                <Building className={styles.building} buildings={this.state.buildings}
                          removeBuilding={this.removeFromBuildings}/>
                <Add buildings={this.state.buildings} addToBuildings={this.addToBuildings}/>
            </div>
        );
    }
}

export default Buildings;