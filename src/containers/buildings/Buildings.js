import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Route} from 'react-router-dom';
import styled from 'styled-components';

import * as actions from '../../api/actions';
import Building from '../../components/building/Building';
import Add from '../../components/building/Add';
import Edit from '../../components/building/Edit';

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
    }

    state = {
        buildings: null,
        error: false
    };

    componentDidMount() {
        this.loadData();
    }

    buildingSelectedHandler = (id) => {
        this.props.history.push('/buildings/' + id)
    };

    loadData = () => {
        if (!this.props.apiState.data.buildings.length) {
            this.props.retrieveBuildings();
        }
    };

    addToBuildings = (building) => {
        this.props.addBuilding(building);
    };

    removeFromBuildings = (id) => {
        this.props.removeBuilding(id);
    };

    render() {
        const buildings = this.props.apiState.data.buildings;

        if (buildings) {
            return (
                <Container>
                    {buildings.map((b) => {
                        return (
                            <Building
                                key={b.buildingId}
                                id={b.buildingId}
                                streetAddress={b.address}
                                floorLevels={b.floorLevels}
                                clicked={() => this.buildingSelectedHandler(b.buildingId)}
                                removeBuilding={() => this.removeFromBuildings(b.buildingId)}/>
                        )
                    })}

                    <Add addToBuildings={this.addToBuildings}/>
                    <Route path={this.props.match.url + '/:id'} exact component={Edit}/>
                </Container>
            );
        }

        return <p>There are no buildings currently available.</p>;
    }
}

const mapStateToProps = state => {
    return {
        apiState: state.apiState
    };
};

const mapDispatchToProps = dispatch => {
    return {
        retrieveBuildings: () => dispatch(actions.retrieveBuildings()),
        addBuilding: (building) => dispatch(actions.addBuilding(building)),
        removeBuilding: (id) => dispatch(actions.removeBuilding(id))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Buildings);