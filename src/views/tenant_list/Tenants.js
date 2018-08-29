import React, {Component} from 'react';
import {connect} from 'react-redux';
import PropTypes from "prop-types";

import * as apiActions from '../../api/actions';
import * as viewActions from '../actions';
import {
    Container,
    DetailsContainer,
    DetailsTitle,
    DetailsText,
    PageContainer,
    Menu,
    Title,
    AddButton
} from "../../components/constants/views";
import Tenant from "../tenant/Tenant";
import TenantData from '../tenant/TenantData';

class Tenants extends Component {
    state = {
        add: false,
        error: false,
        tenantSelectedId: null
    };

    componentDidMount() {
        this.props.retrieveTenants(this.props.apartment.apartmentId);
    }

    toggleAdd = () => {
        this.setState((prevState) => {
            return {add: !prevState.add};
        });
    };

    addToTenants = (data) => {
        this.props.viewPopup({
            title: 'Tenant added...'
        });
        this.toggleAdd();
        this.props.addTenant(data);
    };

    removeFromTenants = (id) => {
        this.props.viewPopup({
            title: 'Tenant deleted...'
        });
        this.props.removeTenant(id);
    };

    render() {
        const tenants = this.props.apiState.data.tenants;
        const {building} = this.props.viewState.frame.props;
        const {apartment} = this.props.viewState.frame.props;

        let addTenant = null;
        if (this.state.add) {
            addTenant = <TenantData add={this.state.add}
                                    title={"Add new tenant"}
                                    toggleAdd={this.toggleAdd}
                                    apartmentId={this.props.apartment.apartmentId}
                                    addTenant={this.addToTenants}/>
        }

        return (
            <Container>
                <Menu onClick={() => this.props.closeFrame('Apartments', {
                    buildingId: building.buildingId,
                    streetAddress: building.streetAddress
                })
                }>‹ Apartments</Menu>
                <DetailsContainer>
                    <DetailsTitle>Apartment {apartment.apartmentNo}</DetailsTitle>
                    <DetailsText>
                        SIZE: {apartment.size} SQUARE METRES
                    </DetailsText>
                    <DetailsText>
                        RENT: {apartment.rent} SEK
                    </DetailsText>
                    <DetailsText>
                        FLOOR: {apartment.floorNo}
                    </DetailsText>
                </DetailsContainer>
                <PageContainer>
                    <Title>Tenants in apartment</Title>
                    {tenants.map((t) => {
                        return (
                            <Tenant
                                key={t.tenantId}
                                tenantId={t.tenantId}
                                firstName={t.firstName}
                                lastName={t.lastName}
                                phoneNo={t.phoneNo}
                                apartmentId={this.props.apartment.apartmentId}
                                removeTenant={() => this.removeFromTenants(t.tenantId)}/>
                        )
                    })}
                    <AddButton onClick={this.toggleAdd}>+</AddButton>
                </PageContainer>
                {addTenant}
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
        retrieveTenants: (apartmentId) => dispatch(apiActions.retrieveTenants(apartmentId)),
        addTenant: (tenant) => dispatch(apiActions.addTenant(tenant)),
        removeTenant: (id) => dispatch(apiActions.removeTenant(id)),
        viewPopup: (popup) => dispatch(viewActions.viewPopup(popup)),
        closeFrame: (view, props) => dispatch(viewActions.closeFrame(view, props))
    };
};

Tenants.propTypes = {
    tenantId: PropTypes.number,
    firstName: PropTypes.string,
    lastName: PropTypes.string,
    phoneNo: PropTypes.string
};

export default connect(mapStateToProps, mapDispatchToProps)(Tenants);