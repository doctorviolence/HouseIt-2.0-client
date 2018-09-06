import React, {Component} from 'react';
import {connect} from 'react-redux';
import styled from "styled-components";

import * as apiActions from '../../api/actions';
import * as viewActions from '../actions';
import {Menu, Title, AddButton, MenuButton} from "../../components/constants/styles/views";
import Apartment from "../../components/apartment/Apartment";
import ApartmentData from "../../components/apartment/Data";
import ApartmentDetails from "../../components/apartment/details/Details";

const Container = styled.div`
    width: 100vw;
    display: flex;
    align-items: center;
    transform: ${props => props.newFrame ? 'slideOut' : 'none'} 0.3s ease-in-out;
    animation: ${props => props.newFrame ? 'slideIn' : 'slideOut'} 0.3s ease-in-out;
    transition: all 0.3s ease-in-out;
   
    @keyframes slideOut {
        0% {
            transform: translateX(-20vw);
        }
    }
   
    @keyframes slideIn {
        100% {
            opacity: 0;
            transform: translateX(100vw);
        }  
    }  
    
    @media screen and (max-width: 700px) {
        flex-direction: column;
    }
`;

const PageContainer = styled.div`
    width: 80vw;
    margin-bottom: 16px;
    display: flex;
    flex-direction: column;
    
    @media screen and (max-width: 700px) {
        width: 100vw;
        margin-bottom: 48px;
    }
`;

const BuildingContainer = styled.div`
    width: 200vw;
    min-width: 200px;
    max-width: 200px;
    height: 200px;
    min-height: 200px;    
    max-height: 200px;
    margin-left: 10px;
    margin-right: 40px;
    margin-bottom: 40px;
    border: 1px solid #f2f2f2;
    flex: 1 1 40%;
    align-text: center;
`;

class Apartments extends Component {
    constructor(props) {
        super(props);

        this.apartmentSelectedHandler = this.apartmentSelectedHandler.bind(this);
        this.addToApartments = this.addToApartments.bind(this);
        this.removeFromApartments = this.removeFromApartments.bind(this);
        this.toggleAdd = this.toggleAdd.bind(this.props.buildingId);

        this.state = {
            add: false,
            apartmentSelectedId: null,
            showDetails: false
        };
    }

    componentDidMount() {
        this.props.retrieveApartmentsInBuilding(this.props.buildingId);
    }

    apartmentSelectedHandler = (id) => {
        this.setState({apartmentSelectedId: id});
    };

    toggleAdd = () => {
        this.setState((prevState) => {
            return {add: !prevState.add};
        });
    };

    addToApartments = (data) => {
        this.toggleAdd();
        this.props.addApartment(data);
    };

    removeFromApartments = (id) => {
        this.props.removeApartment(id);
    };

    render() {
        const apartments = this.props.apiState.data.apartments;
        const building = {
            buildingId: this.props.buildingId,
            name: this.props.name,
            address: this.props.streetAddress,
            zipCode: this.props.zipCode,
            yearBuilt: this.props.yearBuilt,
            inspectionDate: this.props.inspectionDate
        };

        let apartmentDetails = null;
        if (this.state.apartmentSelectedId) {
            apartmentDetails = <ApartmentDetails
                id={this.state.apartmentSelectedId}
                building={building}
                toggleApartmentDetails={() => this.apartmentSelectedHandler()}
                removeApartment={() => this.removeFromApartments(this.state.apartmentSelectedId)}/>;
        }
        return (
            <Container newFrame={this.props.newFrame}>
                <Menu>
                    <MenuButton onClick={() => this.props.closeFrame('Buildings')}>‹ Buildings</MenuButton>
                </Menu>
                <BuildingContainer>{this.props.name}</BuildingContainer>
                <PageContainer>
                    <Title>Apartments in {this.props.name}</Title>
                    {apartmentDetails}
                    {apartments.map((a) => {
                        return (
                            <Apartment
                                key={a.apartmentId}
                                id={a.apartmentId}
                                apartmentNo={a.apartmentNo}
                                name={this.props.name}
                                viewTenants={() => this.props.viewFrame('Tenants', {
                                        building: building,
                                        apartment: {
                                            apartmentId: a.apartmentId,
                                            apartmentNo: a.apartmentNo,
                                            size: a.size,
                                            rent: a.rent,
                                            floorNo: a.floorNo
                                        }
                                    }
                                )}
                                clicked={() => this.apartmentSelectedHandler(a.apartmentId)}/>
                        )
                    })}
                    <AddButton onClick={this.toggleAdd}>+</AddButton>
                </PageContainer>
                <ApartmentData add={this.state.add}
                               title={"Add new apartment"}
                               toggleAdd={this.toggleAdd}
                               buildingId={this.props.buildingId}
                               addApartment={this.addToApartments}/>
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
        retrieveApartmentsInBuilding: (id) => dispatch(apiActions.retrieveApartmentsInBuilding(id)),
        addApartment: (apartment) => dispatch(apiActions.addApartment(apartment)),
        removeApartment: (id) => dispatch(apiActions.removeApartment(id)),
        viewFrame: (view, props) => dispatch(viewActions.viewFrame(view, props)),
        closeFrame: (view) => dispatch(viewActions.closeFrame(view))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Apartments);