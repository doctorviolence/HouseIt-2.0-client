import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Container, TextContainer, Button} from "../../components/constants/components";

import * as actions from '../../api/actions';
import EditBuilding from "../../components/building/Edit";

class Building extends Component {
    state = {
        edit: false
    };

    toggleEdit = () => {
        this.setState((prevState) => {
            return {edit: !prevState.edit};
        });
    };

    render() {
        return (
            <Container key={this.props.id}>
                <TextContainer>
                    <b>ID: </b>{this.props.id}
                    <b>Address: </b>{this.props.streetAddress}
                    <b>Floor levels: </b>{this.props.floorLevels}
                    <EditBuilding id={this.props.id}
                                  address={this.props.streetAddress}
                                  floors={this.props.floorLevels}
                                  display={this.state.edit}
                                  toggleEdit={this.toggleEdit}
                                  editBuilding={(building) => this.props.editBuilding(building, this.props.id)}/>
                    <Button onClick={() => this.props.removeBuilding(this.props.id)}>Remove</Button>
                </TextContainer>
            </Container>
        )
    }
}

const mapStateToProps = state => {
    return {
        apiState: state.apiState
    };
};

const mapDispatchToProps = dispatch => {
    return {
        editBuilding: (building, id) => dispatch(actions.editBuilding(building, id))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Building);