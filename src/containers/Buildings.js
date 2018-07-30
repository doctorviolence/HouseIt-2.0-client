import React, {Component} from 'react';
import * as api from '../api/apiBuilding';
import {Route} from 'react-router-dom';

import Building from '../components/building/Building';
import Add from '../components/building/Add';
import Edit from '../components/building/Edit';
import styles from '../assets/css/component.css';

class Buildings extends Component {
    constructor() {
        super();

        this.addToBuildings = this.addToBuildings.bind(this);
        this.buildingSelectedHandler = this.buildingSelectedHandler.bind(this);
        this.addToBuildings = this.addToBuildings.bind(this);
        this.removeFromBuildings = this.removeFromBuildings.bind(this);

        this.state = {
            buildings: [],
            error: false
        }
    }

    shouldComponentUpdate(nextProps) {
        return nextProps.buildings !== this.state.buildings;
    }

    componentDidMount() {
        this.loadData();
    }

    buildingSelectedHandler = (id) => {
        this.props.history.push('/buildings/' + id)
    };

    loadData = () => {
        // query.access_token = JSON.parse(localStorage.getItem('user')).access_token;

        api.getBuildings().then(result => {
            this.setState({buildings: result});
        }).catch(e => {
            console.log('Error loading buildings:', e);
            this.setState({error: true});
        })
    };

    addToBuildings = (building) => {
        const updated = [...this.state.buildings];
        updated.push(building);
        this.setState({buildings: updated});
        console.log('Building added');
    };

    removeFromBuildings = (id) => {
        // query.access_token = JSON.parse(localStorage.getItem('user')).access_token;
        api.deleteBuilding(id).then(result => {
                const buildings = [...this.state.buildings];
                delete buildings[id];
                const updated = buildings.filter(el => {
                    return el.id !== id;
                });
                this.setState({buildings: updated});
            }
        ).catch(e => {
            console.log(e);
        });
        console.log('Building removed');
    };

    render() {
        let buildings = <p>There are no buildings currently available.</p>;
        if (!this.state.error) {
            buildings = this.state.buildings.map(b => {
                    return (
                        <div key={b.id}>
                            <Building
                                key={b.id}
                                id={b.id}
                                streetAddress={b.streetAddress}
                                floorLevels={b.floorLevels}
                                clicked={() => this.buildingSelectedHandler(b.id)}
                                removeBuilding={() => this.removeFromBuildings(b.id)}/>
                        </div>
                    )
                }
            );
        }

        return (
            <div className={styles.component}>
                <h1>Buildings</h1>
                {buildings}
                <Add addToBuildings={this.addToBuildings}/>
                <Route path={this.props.match.url + '/:id'} exact component={Edit}/>
            </div>
        );
    }
}

export default Buildings;