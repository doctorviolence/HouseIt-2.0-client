import React, {Component} from 'react';
import {connect} from 'react-redux';
import styled from 'styled-components';

import * as actions from '../../api/actions';
import Building from '../building/Building';
import Add from '../../components/building/Add';

const Container = styled.div`
    align-items: flex-end;
    justify-content: center;
`;

class Buildings extends Component {
    state = {
        buildings: null,
        add: false,
        error: false
    };

    componentDidMount() {
        this.loadData();
    }

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

    toggleAdd = () => {
        this.setState((prevState) => {
            return {add: !prevState.add};
        });
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
                                removeBuilding={() => this.removeFromBuildings(b.buildingId)}/>
                        )
                    })}
                    <Add display={this.state.add} toggleAdd={this.toggleAdd} addToBuildings={this.addToBuildings}/>
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