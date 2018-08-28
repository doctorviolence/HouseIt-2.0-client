import React, {Component} from 'react';
import {connect} from 'react-redux';
import styled from 'styled-components';
import PropTypes from "prop-types";

import * as apiActions from '../../api/actions';
import * as viewActions from '../actions';
import Apartment from "../apartment/Apartment";
import ApartmentData from "../apartment/ApartmentData";

const Container = styled.div`
    align-items: flex-end;
    justify-content: center;
`;

const Title = styled.h2`
    color: #000000;
    font-size: 30px;
    font-weight: bold;
    cursor: pointer;
    
    @media screen and (max-width: 700px) {
        font-size: 20px;
    }
`;

const Button = styled.button`
    color: #CC0033;
    background: #ffffff;
    border: none;
    font-size: 20px;
    font-weight: bold;
    cursor: pointer;
    user-select: none;
    
    @media screen and (max-width: 700px) {
        font-size: 15px;
    }
`;

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
                <Title onClick={() => this.props.closeChildrenFrame('Buildings')}>‹ Apartments</Title>
                {apartments.map((a) => {
                    return (
                        <Apartment
                            key={a.apartmentId}
                            id={a.apartmentId}
                            apartmentNo={a.apartmentNo}
                            size={a.size}
                            rent={a.rent}
                            floorNo={a.floorNo}
                            removeApartment={() => this.removeFromApartments(a.apartmentId)}/>
                    )
                })}
                <Button onClick={this.toggleAdd}>+</Button>
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
        closeChildrenFrame: (view) => dispatch(viewActions.closeChildrenFrame(view))
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