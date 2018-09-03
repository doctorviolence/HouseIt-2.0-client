import React, {Component} from 'react';
import {connect} from 'react-redux';

import * as apiActions from '../../api/actions';
import * as viewActions from '../actions';
import {AddButton, Container, Menu, MenuButton, Title, PageContainer} from "../../components/constants/styles/views";
import Building from '../../components/building/Building';
import BuildingData from '../../components/building/Data';
import styled from "styled-components";
import BuildingDetails from "../../components/building/details/Details";

const Content = styled.div`
    display: flex;
    flex-wrap: wrap;
    margin-left: 10vw;
    animation: 'fadeIn' 0.3s ease-in-out;
    transition: all 0.3s ease-in-out;
    
    @keyframes fadeIn {
      0% {
         opacity: 0;
      }
    }
    
    @media screen and (max-width: 700px) {
        margin-left: 10vw;
    }
    
    @media screen and (max-width: 300px) {
        margin-left: 20vw;
    }
`;

const BuildingContainer = styled.div`
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
    }
    
    &:hover {
        background: #f2f2f2;
    }
`;

class Buildings extends Component {
    constructor(props) {
        super(props);

        this.buildingSelectedHandler = this.buildingSelectedHandler.bind(this);
        this.addToBuildings = this.addToBuildings.bind(this);
        this.removeFromBuildings = this.removeFromBuildings.bind(this);
        this.toggleAdd = this.toggleAdd.bind(this);

        this.state = {
            add: false,
            buildingSelectedId: null,
            showDetails: false
        };
    }

    componentDidMount() {
        if (!this.props.apiState.data.buildings.length) {
            this.props.retrieveBuildings();
        }
    }

    buildingSelectedHandler = (id) => {
        this.setState((prevState) => {
            return {buildingSelectedId: id, showDetails: !prevState.showDetails}
        });
    };

    toggleAdd = () => {
        this.setState((prevState) => {
            return {add: !prevState.add};
        });
    };

    addToBuildings = (data, file) => {
        this.props.viewPopup({
            title: 'Building added...'
        });
        this.toggleAdd();
        this.props.addBuilding(data, file);
    };

    removeFromBuildings = (id) => {
        this.props.viewPopup({
            title: 'Building deleted...'
        });
        this.props.removeBuilding(id);
    };

    render() {
        const buildings = this.props.apiState.data.buildings;

        let buildingDetails = null;
        if (this.state.buildingSelectedId) {
            buildingDetails = <BuildingDetails
                id={this.state.buildingSelectedId}
                showDetails={this.state.showDetails}
                toggleBuildingDetails={() => this.buildingSelectedHandler()}
                removeBuilding={() => this.removeFromBuildings(this.state.buildingSelectedId)}/>;
        }
        return (
            <Container>
                <Menu>
                    <MenuButton onClick={() => this.props.closeFrame('Menu')}>‹ Menu</MenuButton>
                </Menu>
                <PageContainer>
                    <Title>Buildings</Title>
                    {buildingDetails}
                    <Content>
                        {buildings.map((b) => {
                            return (
                                <Building
                                    key={b.buildingId}
                                    id={b.buildingId}
                                    name={b.name}
                                    viewApartments={() => this.props.viewFrame('Apartments', {
                                            buildingId: b.buildingId,
                                            name: b.name,
                                            address: b.address,
                                            zipCode: b.zipCode,
                                            yearBuilt: b.yearBuilt,
                                            inspectionDate: b.inspectionDate
                                        }
                                    )}
                                    clicked={() => this.buildingSelectedHandler(b.buildingId)}/>
                            )
                        })}
                        <BuildingContainer>
                            <AddButton onClick={this.toggleAdd}>+</AddButton>
                        </BuildingContainer>
                    </Content>
                </PageContainer>
                <BuildingData add={this.state.add}
                              title={"Add new building"}
                              toggleAdd={this.toggleAdd}
                              addBuilding={this.addToBuildings}/>
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
        addBuilding: (building, file) => dispatch(apiActions.addBuilding(building, file)),
        removeBuilding: (id) => dispatch(apiActions.removeBuilding(id)),
        viewPopup: (popup) => dispatch(viewActions.viewPopup(popup)),
        viewFrame: (view, props) => dispatch(viewActions.viewFrame(view, props)),
        closeFrame: (view) => dispatch(viewActions.closeFrame(view))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Buildings);