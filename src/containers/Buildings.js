import React, {Component} from 'react';
import {Route} from 'react-router-dom';
import styled from 'styled-components';
import * as api from '../api/apiBuilding';

import Building from '../components/building/Building';
import Add from '../components/building/Add';
import Edit from '../components/building/Edit';

const Container = styled.div`
    align-items: flex-end;
    justify-content: center;
`;

class Buildings extends Component {
    constructor() {
        super();

        this.addToBuildings = this.addToBuildings.bind(this);
        this.buildingSelectedHandler = this.buildingSelectedHandler.bind(this);
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
        const queryToken = localStorage.getItem('token');

        api.getBuildings(queryToken).then(result => {
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
        const queryToken = localStorage.getItem('token');

        api.deleteBuilding(id, queryToken).then(result => {
                if (result.status === 500 && result !== null) {
                    console.log(result.error);
                    return;
                }

                const buildings = [...this.state.buildings];
                const updated = buildings.filter(el => {
                    return el.buildingId !== id;
                });
                this.setState({buildings: updated});
            }
        ).catch(e => {
            console.log(e);
        });
    };

    render() {
        let buildings = <p>There are no buildings currently available.</p>;
        if (!this.state.error) {
            buildings = this.state.buildings.map(b => {
                    return (
                        <Container key={b.buildingId}>
                            <Building
                                key={b.buildingId}
                                id={b.buildingId}
                                streetAddress={b.address}
                                floorLevels={b.floorLevels}
                                clicked={() => this.buildingSelectedHandler(b.buildingId)}
                                removeBuilding={() => this.removeFromBuildings(b.buildingId)}/>
                        </Container>
                    )
                }
            );
        }

        return (
            <Container>
                <h1>Buildings</h1>
                {buildings}
                <Add addToBuildings={this.addToBuildings}/>
                <Route path={this.props.match.url + '/:id'} exact component={Edit}/>
            </Container>
        );
    }
}

export default Buildings;