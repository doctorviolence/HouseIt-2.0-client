import React, {Component} from 'react';
import {connect} from 'react-redux';

import {Container, TextContainer, ButtonContainer, Button} from "../../components/constants/components";
import * as actions from '../../api/actions';
import ApartmentData from './ApartmentData';
import * as viewActions from "../actions";

class Apartment extends Component {
    state = {
        edit: false,
        error: false
    };

    toggleEdit = () => {
        this.setState((prevState) => {
            return {edit: !prevState.edit};
        });
    };

    editApartment = (data, id) => {
        this.toggleEdit();
        this.props.editApartment(data, id);
    };

    render() {
        let editApartment = null;
        if (this.state.edit) {
            editApartment = <ApartmentData id={this.props.id}
                                           edit={this.state.edit}
                                           title={"Edit apartment"}
                                           toggleEdit={this.toggleEdit}
                                           editApartment={this.editApartment}
                                           apartmentNo={this.props.apartmentNo}
                                           size={this.props.size}
                                           rent={this.props.rent}
                                           floorNo={this.props.floorNo}
                                           buildingId={this.props.buildingId}/>
        }

        return (
            <Container key={this.props.id}>
                <TextContainer onClick={() => this.props.viewFrame('Tenants', {
                    building: this.props.building,
                    apartment: {
                        apartmentId: this.props.id,
                        apartmentNo: this.props.apartmentNo,
                        size: this.props.size,
                        rent: this.props.rent,
                        floorNo: this.props.floorNo
                    }
                })}>
                    {this.props.apartmentNo}
                </TextContainer>
                <ButtonContainer>
                    <Button onClick={this.toggleEdit}>Edit</Button>
                    <Button onClick={() => this.props.removeApartment(this.props.id)}>Remove</Button>
                </ButtonContainer>
                {editApartment}
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
        viewFrame: (view, props) => dispatch(viewActions.viewFrame(view, props)),
        viewPopup: (popup) => dispatch(viewActions.viewPopup(popup)),
        editApartment: (apartment, id) => dispatch(actions.editApartment(apartment, id))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Apartment);