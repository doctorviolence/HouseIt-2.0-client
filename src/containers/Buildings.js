import React, {Component} from 'react';
import * as api from '../api/apiBuilding';

import Building from '../components/building/Building';
import Add from '../components/building/Add';

class Buildings extends Component {
    constructor() {
        super();

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
        this.getBuildings();
    }

    getBuildings = () => {
        // query.access_token = JSON.parse(localStorage.getItem('user')).access_token;

        api.getBuildings().then(result => {
            this.setState({buildings: result});
        })
            .catch(e => {
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
                    return <Building
                        key={b.id}
                        id={b.id}
                        streetAddress={b.address}
                        floorLevels={b.floorLevels}
                        removeBuilding={() => this.removeFromBuildings}/>
                }
            );
        }

        return (
            <div>
                <section className="Buildings">
                    <h1>Buildings</h1>
                    {buildings}
                </section>
                <Add addToBuildings={this.addToBuildings}/>
            </div>
        );
    }
}

export default Buildings;