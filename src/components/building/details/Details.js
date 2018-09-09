import React, {Component} from 'react';
import {connect} from 'react-redux';

import * as apiActions from "../../../api/actions";
import * as viewActions from "../../../views/actions";
import {ButtonContainer, Button} from "../../constants/styles/components";
import {
    Container,
    DetailsContainer,
    DetailsClose,
    CloseButton,
    DetailsTitle,
    DetailsText,
    Label,
    Text,
    Backdrop
} from "../../constants/styles/details";
import BuildingData from "../Data";

class BuildingDetails extends Component {
    constructor(props) {
        super(props);

        this.toggleEdit = this.toggleEdit.bind(this);
        this.editBuilding = this.editBuilding.bind(this);
        this.uploadBuildingImage = this.uploadBuildingImage.bind(this);
        this.removeBuilding = this.removeBuilding.bind(this);

        this.state = {
            edit: false
        };
    }

    toggleEdit = () => {
        this.setState((prevState) => {
            return {edit: !prevState.edit};
        });
    };

    editBuilding = (data, id) => {
        this.toggleEdit();
        this.props.editBuilding(data, id);
    };

    uploadBuildingImage = (name, file) => {
        this.props.uploadBuildingFile(name, file);
    };

    removeBuilding = (id) => {
        this.props.removeBuilding(id);
        this.props.toggleBuildingDetails();
    };

    getBuildingDetails = (id) => {
        const buildings = this.props.apiState.data.buildings;
        return buildings.filter((b) => b.buildingId === id);
    };

    render() {
        let building = null;
        if (this.props.id) {
            const b = this.getBuildingDetails(this.props.id);
            const {buildingId, name, address, zipCode, yearBuilt, inspectionDate} = b[0];

            building = (
                <Container>
                    <DetailsContainer>
                        <DetailsClose>
                            <CloseButton onClick={() => this.props.toggleBuildingDetails()}>&times;</CloseButton>
                        </DetailsClose>
                        <DetailsText>
                            <DetailsTitle>{name}</DetailsTitle>
                            <Text><Label>Address:</Label> {address}</Text>
                            <Text><Label>Zip code:</Label> {zipCode}</Text>
                            <Text><Label>Year built:</Label> {yearBuilt}</Text>
                            <Text><Label>Inspection date:</Label> {inspectionDate}</Text>
                        </DetailsText>
                        <ButtonContainer>
                            <Button onClick={this.toggleEdit}>Edit</Button>
                            <Button onClick={() => this.removeBuilding(this.props.id)}>Remove</Button>
                        </ButtonContainer>
                    </DetailsContainer>
                    <BuildingData id={b[0].buildingId}
                                  edit={this.state.edit}
                                  title={"Edit building"}
                                  toggleEdit={this.toggleEdit}
                                  editBuilding={this.editBuilding}
                                  name={b[0].name}
                                  streetAddress={b[0].address}
                                  zipCode={b[0].zipCode}
                                  yearBuilt={b[0].yearBuilt}
                                  inspectionDate={b[0].inspectionDate}
                                  uploadBuildingImage={this.uploadBuildingImage}/>
                    <Backdrop onClick={() => this.props.toggleBuildingDetails()}/>
                </Container>
            );
        }
        return building;
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
        uploadBuildingFile: (name, file) => dispatch(apiActions.uploadBuildingFile(name, file)),
        editBuilding: (building, id) => dispatch(apiActions.editBuilding(building, id)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(BuildingDetails);