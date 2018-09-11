import React, {Component} from 'react';
import {connect} from 'react-redux';
import styled from "styled-components";

import * as apiActions from '../../api/actions';
import * as viewActions from '../actions';
import {AddButton, Container, Menu, MenuButton, Title, PageContainer} from "../../components/constants/styles/views";
import Building from '../../components/building/Building';
import BuildingData from '../../components/building/Data';
import BuildingDetails from "../../components/building/details/Details";

const Content = styled.div`
    display: flex;
    flex-wrap: wrap;
    margin: auto;
    
    @media screen and (max-width: 700px) {
    }
    
    @media screen and (max-width: 300px) {
    }
`;

class Buildings extends Component {
    constructor(props) {
        super(props);

        this.buildingSelectedHandler = this.buildingSelectedHandler.bind(this);
        this.addToBuildings = this.addToBuildings.bind(this);
        this.uploadBuildingImage = this.uploadBuildingImage.bind(this);
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

    addToBuildings = (data) => {
        this.toggleAdd();
        this.props.addBuilding(data);
    };

    uploadBuildingImage = (name, file) => {
        this.props.uploadBuildingFile(name, file);
    };

    removeFromBuildings = (id) => {
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
                    <Title>Buildings</Title>
                </Menu>
                <PageContainer>
                    {buildingDetails}
                    <Content>
                        {buildings.map((b) => {
                            return (
                                <Building
                                    key={b.buildingId}
                                    id={b.buildingId}
                                    name={b.name}
                                    imageAttached={b.imageAttached}
                                    viewApartments={() => this.props.viewFrame('Apartments', {
                                            buildingId: b.buildingId,
                                            name: b.name,
                                            address: b.address,
                                            zipCode: b.zipCode,
                                            yearBuilt: b.yearBuilt,
                                            inspectionDate: b.inspectionDate,
                                            image: b.imageAttached
                                        }
                                    )}
                                    clicked={() => this.buildingSelectedHandler(b.buildingId)}/>
                            )
                        })}
                    </Content>
                </PageContainer>
                <AddButton onClick={this.toggleAdd}>New Building...</AddButton>
                <BuildingData add={this.state.add}
                              title={"Add new building"}
                              toggleAdd={this.toggleAdd}
                              addBuilding={this.addToBuildings}
                              uploadBuildingImage={this.uploadBuildingImage}/>
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
        uploadBuildingFile: (name, file) => dispatch(apiActions.uploadBuildingFile(name, file)),
        removeBuilding: (id) => dispatch(apiActions.removeBuilding(id)),
        viewFrame: (view, props) => dispatch(viewActions.viewFrame(view, props)),
        closeFrame: (view) => dispatch(viewActions.closeFrame(view))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Buildings);