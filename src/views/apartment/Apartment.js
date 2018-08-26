import React, {Component} from 'react';
import {connect} from 'react-redux';

import {Container, TextContainer, Button} from "../../components/constants/components";
import * as actions from '../../api/actions';
import ApartmentData from './ApartmentData';

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
                                           floorNo={this.props.floorNo}/>
        }

        return (
            <Container key={this.props.id}>
                <TextContainer>
                    {this.props.apartmentNo}
                </TextContainer>
                <TextContainer>
                    {this.props.size}
                </TextContainer>
                <TextContainer>
                    {this.props.rent}
                </TextContainer>
                <TextContainer>
                    {this.props.floorNo}
                </TextContainer>
                <Button onClick={this.toggleEdit}>Edit</Button>
                {editApartment}
                <Button onClick={() => this.props.removeApartment(this.props.id)}>Remove</Button>
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
        editApartment: (apartment, id) => dispatch(actions.editApartment(apartment, id))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Apartment);