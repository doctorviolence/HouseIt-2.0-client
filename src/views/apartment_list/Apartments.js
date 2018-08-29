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
    Title,
    AddButton, DetailsText
} from "../../components/constants/views";
import Apartment from "../apartment/Apartment";
import ApartmentData from "../apartment/ApartmentData";

class Apartments extends Component {
    state = {
        add: false,
        error: false,
        apartmentSelectedId: null
    };

    componentDidMount() {
        this.props.retrieveApartmentsInBuilding(this.props.buildingId);
    }

    toggleAdd = () => {
        this.setState((prevState) => {
            return {add: !prevState.add};
        });
    };

    addToApartments = (data) => {
        this.props.viewPopup({
            title: 'Apartment added...'
        });
        this.toggleAdd();
        this.props.addApartment(data);
    };

    removeFromApartments = (id) => {
        this.props.viewPopup({
            title: 'Apartment deleted...'
        });
        this.props.removeApartment(id);
    };

    render() {
        const apartments = this.props.apiState.data.apartments;
        const building = {buildingId: this.props.buildingId, streetAddress: this.props.streetAddress};

        let addApartment = null;
        if (this.state.add) {
            addApartment = <ApartmentData add={this.state.add}
                                          title={"Add new apartment"}
                                          toggleAdd={this.toggleAdd}
                                          buildingId={this.props.buildingId}
                                          addApartment={this.addToApartments}/>
        }

        return (
            <Container>
                <Menu onClick={() => this.props.closeFrame('Buildings')}>‹ Buildings</Menu>
                <DetailsContainer>
                    <DetailsTitle>{this.props.streetAddress}</DetailsTitle>
                    <DetailsText>
                        ADDRESS: TO-DO
                    </DetailsText>
                    <DetailsText>
                        ZIP CODE: TO-DO
                    </DetailsText>
                    <DetailsText>
                        BUILT IN YEAR: TO-DO
                    </DetailsText>
                    <DetailsText>
                        LAST INSPECTED: TO-DO
                    </DetailsText>
                </DetailsContainer>
                <PageContainer>
                    <Title>Apartments in building</Title>
                    {apartments.map((a) => {
                        return (
                            <Apartment
                                key={a.apartmentId}
                                id={a.apartmentId}
                                apartmentNo={a.apartmentNo}
                                size={a.size}
                                rent={a.rent}
                                floorNo={a.floorNo}
                                building={building}
                                removeApartment={() => this.removeFromApartments(a.apartmentId)}/>
                        )
                    })}
                    <AddButton onClick={this.toggleAdd}>+</AddButton>
                </PageContainer>
                {addApartment}
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
        //retrieveApartments: () => dispatch(apiActions.retrieveApartments()),
        retrieveApartmentsInBuilding: (id) => dispatch(apiActions.retrieveApartmentsInBuilding(id)),
        addApartment: (apartment) => dispatch(apiActions.addApartment(apartment)),
        removeApartment: (id) => dispatch(apiActions.removeApartment(id)),
        viewPopup: (popup) => dispatch(viewActions.viewPopup(popup)),
        closeFrame: (view) => dispatch(viewActions.closeFrame(view))
    };
};

Apartments.propTypes = {
    id: PropTypes.number,
    apartmentNo: PropTypes.string,
    floorLevels: PropTypes.number,
    rent: PropTypes.number,
    size: PropTypes.number
};

export default connect(mapStateToProps, mapDispatchToProps)(Apartments);