import React, {Component} from 'react';
import {connect} from 'react-redux';

import {Container, TextContainer, Button} from "../../components/constants/components";
import * as actions from '../../api/actions';
import BuildingData from './BuildingData';
import * as viewActions from "../actions";

class Building extends Component {
    state = {
        edit: false,
        error: false
    };

    toggleEdit = () => {
        this.setState((prevState) => {
            return {edit: !prevState.edit};
        });
    };

    editBuilding = (data, id) => {
        this.toggleEdit();
        this.props.editBuilding(data, id);
    };

    render() {
        let editBuilding = null;
        if (this.state.edit) {
            editBuilding = <BuildingData id={this.props.id}
                                         edit={this.state.edit}
                                         title={"Edit building"}
                                         toggleEdit={this.toggleEdit}
                                         editBuilding={this.editBuilding}
                                         streetAddress={this.props.streetAddress}/>
        }

        return (
            <Container key={this.props.id}>
                <TextContainer>
                    {this.props.streetAddress}
                </TextContainer>
                <Button onClick={() => this.props.viewChildrenFrame('Apartments', this.props.id)}>Show
                    Apartments</Button>
                <Button onClick={this.toggleEdit}>Edit</Button>
                {editBuilding}
                <Button onClick={() => this.props.removeBuilding(this.props.id)}>Remove</Button>
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
        viewChildrenFrame: (view, parentId) => dispatch(viewActions.viewChildrenFrame(view, parentId)),
        editBuilding: (building, id) => dispatch(actions.editBuilding(building, id))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Building);