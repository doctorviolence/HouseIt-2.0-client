import React, {Component} from 'react';
import {connect} from 'react-redux';
import styled from 'styled-components';
import PropTypes from "prop-types";

import * as apiActions from '../../api/actions';
import * as viewActions from '../actions';
import Building from '../building/Building';
import BuildingData from '../building/BuildingData';

const Container = styled.div`
    align-items: flex-end;
    justify-content: center;
`;

const Title = styled.h2`
    color: #000000;
    font-size: 30px;
    font-weight: bold;
    cursor: pointer;
    
    @media screen and (max-width: 700px) {
        font-size: 20px;
    }
`;

const Button = styled.button`
    color: #CC0033;
    background: #ffffff;
    border: none;
    font-size: 20px;
    font-weight: bold;
    cursor: pointer;
    user-select: none;
    
    @media screen and (max-width: 700px) {
        font-size: 15px;
    }
`;

class Buildings extends Component {
    state = {
        add: false,
        error: false,
        buildingSelectedId: null
    };

    componentDidMount() {
        if (!this.props.apiState.data.buildings.length) {
            this.props.retrieveBuildings();
        }
    }

    toggleAdd = () => {
        this.setState((prevState) => {
            return {add: !prevState.add};
        });
    };

    addToBuildings = (data) => {
        this.props.viewPopup({
            title: 'Building added...'
        });
        this.toggleAdd();
        this.props.addBuilding(data);
    };

    removeFromBuildings = (id) => {
        this.props.viewPopup({
            title: 'Building deleted...'
        });
        this.props.removeBuilding(id);
    };

    render() {
        const buildings = this.props.apiState.data.buildings;

        let addBuilding = null;
        if (this.state.add) {
            addBuilding = <BuildingData add={this.state.add}
                                        title={"Add new building"}
                                        toggleAdd={this.toggleAdd}
                                        addBuilding={this.addToBuildings}/>
        }

        return (
            <Container>
                <Title onClick={() => this.props.closeFrame('Menu')}>‹ Buildings</Title>
                {buildings.map((b) => {
                    return (
                        <Building
                            key={b.buildingId}
                            id={b.buildingId}
                            streetAddress={b.address}
                            removeBuilding={() => this.removeFromBuildings(b.buildingId)}/>
                    )
                })}
                <Button onClick={this.toggleAdd}>+</Button>
                {addBuilding}
            </Container>
        );
    }
}

const mapStateToProps = state => {
    return {
        apiState: state.apiState,
        viewState: state.viewState
    };
};

const mapDispatchToProps = dispatch => {
    return {
        retrieveBuildings: () => dispatch(apiActions.retrieveBuildings()),
        addBuilding: (building) => dispatch(apiActions.addBuilding(building)),
        removeBuilding: (id) => dispatch(apiActions.removeBuilding(id)),
        viewPopup: (popup) => dispatch(viewActions.viewPopup(popup)),
        closeFrame: (view) => dispatch(viewActions.closeFrame(view))
    };
};

Buildings.propTypes = {
    streetAddress: PropTypes.string
};

export default connect(mapStateToProps, mapDispatchToProps)(Buildings);