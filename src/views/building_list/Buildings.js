import React, {Component} from 'react';
import {connect} from 'react-redux';
import PropTypes from "prop-types";

import * as apiActions from '../../api/actions';
import * as viewActions from '../actions';
import {
    Container,
    DetailsContainer,
    DetailsTitle,
    PageContainer,
    Menu,
    AddButton
} from "../../components/constants/views";
import Building from '../building/Building';
import BuildingData from '../building/BuildingData';
import styled from "styled-components";

const BuildingContainer = styled.div`
    width: 100%;
    display: flex;
    flex-wrap: wrap;
    animation: 'fadeIn' 0.3s ease-in-out;
    transition: all 0.3s ease-in-out;
    
    @keyframes fadeIn {
      0% {
         opacity: 0;
      }
   }
`;

const BuildingElement = styled.div`
    width: 200px;
    max-width: 200px;
    height: 200px;
    max-height: 200px;
    margin-right: 40px;
    margin-bottom: 40px;
    border: 1px solid #f2f2f2;
    flex: 1 1 40%;
    justify-content: center;
    
    @media screen and (max-width: 700px) {
        width: 100px;
        max-width: 100px;
        height: 100px;
        max-height: 100px;
        margin-right: auto;
        margin-left: auto;
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
                <Menu onClick={() => this.props.closeFrame('Menu')}>‹ Menu</Menu>
                <DetailsContainer>
                    <DetailsTitle>Buildings</DetailsTitle>
                </DetailsContainer>
                <PageContainer>
                    <BuildingContainer>
                        {buildings.map((b) => {
                            return (
                                <Building
                                    key={b.buildingId}
                                    id={b.buildingId}
                                    streetAddress={b.address}
                                    removeBuilding={() => this.removeFromBuildings(b.buildingId)}/>
                            )
                        })}
                        <BuildingElement>
                            <AddButton onClick={this.toggleAdd}>+</AddButton>
                        </BuildingElement>
                    </BuildingContainer>
                </PageContainer>
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