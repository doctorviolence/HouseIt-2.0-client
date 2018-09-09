import React, {Component} from 'react';
import {connect} from 'react-redux';
import styled from "styled-components";

import * as apiActions from '../../api/actions';
import * as viewActions from '../actions';
import {Menu, Title, Subtitle, AddButton, MenuButton} from "../../components/constants/styles/views";
import Apartment from "../../components/apartment/Apartment";
import ApartmentData from "../../components/apartment/Data";
import ApartmentDetails from "../../components/apartment/details/Details";

const Container = styled.div`
    display: inline-block;
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

const BuildingContainer = styled.img`
    margin-top: 48px;
    width: 250vw;
    min-width: 250px;
    max-width: 250px;
    height: 250px;
    min-height: 250px;    
    max-height: 250px;
    margin-left: 10px;
    margin-right: 40px;
    margin-bottom: 40px;
`;

const DescriptionContainer = styled.div``;

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
        const url = this.props.image ? `/images/${this.props.name}.png` : `/images/house.png`;
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
                <BuildingContainer src={url}/>
                <PageContainer>
                    <DescriptionContainer>
                        <Title>Apartments in {this.props.name}</Title>
                    </DescriptionContainer>
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
                                            floorNo: a.floorNo,
                                        },
                                        image: this.props.image
                                    }
                                )}
                                clicked={() => this.apartmentSelectedHandler(a.apartmentId)}/>
                        )
                    })}
                    <AddButton onClick={this.toggleAdd}>New Apartment...</AddButton>
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