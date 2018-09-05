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
import ApartmentData from "../Data";

class ApartmentDetails extends Component {
    constructor(props) {
        super(props);

        this.toggleEdit = this.toggleEdit.bind(this);
        this.editApartment = this.editApartment.bind(this);
        this.removeApartment = this.removeApartment.bind(this);

        this.state = {
            edit: false
        };
    }

    toggleEdit = () => {
        this.setState((prevState) => {
            return {edit: !prevState.edit};
        });
    };

    editApartment = (data, id) => {
        this.toggleEdit();
        this.props.editApartment(data, id);
    };

    removeApartment = (id) => {
        this.props.removeApartment(id);
        this.props.toggleApartmentDetails();
    };

    getApartmentDetails = (id) => {
        const apartments = this.props.apiState.data.apartments;
        return apartments.filter((a) => a.apartmentId === id);
    };

    render() {
        let apartment = null;
        if (this.props.id) {
            const a = this.getApartmentDetails(this.props.id);
            const {apartmentNo, size, rent, floorNo} = a[0];

            apartment = (
                <Container>
                    <DetailsContainer>
                        <DetailsClose>
                            <CloseButton onClick={() => this.props.toggleApartmentDetails()}>&times;</CloseButton>
                        </DetailsClose>
                        <DetailsText>
                            <DetailsTitle>{apartmentNo}</DetailsTitle>
                            <Text><Label>Size:</Label> {size}</Text>
                            <Text><Label>Rent:</Label> {rent}kr</Text>
                            <Text><Label>Floor No:</Label> {floorNo}</Text>
                        </DetailsText>
                        <ButtonContainer>
                            <Button onClick={this.toggleEdit}>Edit</Button>
                            <Button onClick={() => this.removeApartment(this.props.id)}>Remove</Button>
                        </ButtonContainer>
                    </DetailsContainer>
                    <ApartmentData id={this.props.id}
                                   edit={this.state.edit}
                                   title={"Edit apartment"}
                                   toggleEdit={this.toggleEdit}
                                   editApartment={this.editApartment}
                                   apartmentNo={apartmentNo}
                                   size={size}
                                   rent={rent}
                                   floorNo={floorNo}
                                   building={this.props.building}/>
                    <Backdrop onClick={() => this.props.toggleApartmentDetails()}/>
                </Container>
            );
        }
        return apartment;
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
        editApartment: (apartment, id) => dispatch(apiActions.editApartment(apartment, id)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ApartmentDetails);