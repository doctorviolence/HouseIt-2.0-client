import React, {Component} from 'react';
import {connect} from 'react-redux';
import styled from "styled-components";

import {Button} from "../../components/constants/components";
import * as actions from '../../api/actions';
import BuildingData from './BuildingData';
import * as viewActions from "../actions";

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

const TextContainer = styled.div`
    height: 160px;
    text-align: center;
    font-size: 14px;
    font-weight: bold;
    display: flex;
    flex-direction: column;
    justify-content: center;
    cursor: pointer;
    user-select: none;
    
    @media screen and (max-width: 700px) {
        font-size: 12px;
        height: 60px;
    }
    
    &:hover {
        font-size: 16px;
    }
`;

const ButtonContainer = styled.div`
    height: 40px;
    display: flex;
    justify-content: space-between;
    
    @media screen and (max-width: 700px) {
        height: 40px;
    }
`;

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
            <BuildingElement key={this.props.id}>
                <TextContainer onClick={() => this.props.viewFrame('Apartments', {
                    buildingId: this.props.id,
                    streetAddress: this.props.streetAddress
                })}>
                    {this.props.streetAddress}
                </TextContainer>
                <ButtonContainer>
                    <Button onClick={this.toggleEdit}>Edit</Button>
                    <Button onClick={() => this.props.removeBuilding(this.props.id)}>Remove</Button>
                </ButtonContainer>
                {editBuilding}
            </BuildingElement>
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
        viewFrame: (view, props) => dispatch(viewActions.viewFrame(view, props)),
        viewPopup: (popup) => dispatch(viewActions.viewPopup(popup)),
        editBuilding: (building, id) => dispatch(actions.editBuilding(building, id))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Building);