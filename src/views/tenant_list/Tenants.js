import React, {Component} from 'react';
import {connect} from 'react-redux';
import styled from 'styled-components';
import PropTypes from "prop-types";

import * as apiActions from '../../api/actions';
import * as viewActions from '../actions';
import Tenant from "../tenant/Tenant";
import TenantData from '../tenant/TenantData';
import Popup from '../../components/ui/popup/Popup';

const Container = styled.div`
    align-items: flex-end;
    justify-content: center;
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

class Tenants extends Component {
    state = {
        add: false,
        error: false,
        tenantSelectedId: null
    };

    componentDidMount() {
        this.props.retrieveTenants(this.props.apartmentId);
    }

    toggleAdd = () => {
        this.setState((prevState) => {
            return {add: !prevState.add};
        });
    };

    addToTenants = (data) => {
        this.toggleAdd();
        this.props.addTenant(data);
    };

    removeFromTenants = (id) => {
        this.props.viewPopup({
            title: 'Tenant deleted!'
        });
        this.props.removeTenant(id);
    };

    render() {
        const {showPopup, popupTitle, popupActions} = this.props.viewState;
        const tenants = this.props.apiState.data.tenants;

        let addTenant = null;
        if (this.state.add) {
            addTenant = <TenantData add={this.state.add}
                                    title={"Add new tenant"}
                                    toggleAdd={this.toggleAdd}
                                    apartmentId={this.props.apartmentId}
                                    addTenant={this.addToTenants}/>
        }

        return (
            <Container>
                <Button onClick={() => this.props.closeSubChildrenFrame('Apartments')}>‹ Tenants</Button>
                {tenants.map((t) => {
                    return (
                        <Tenant
                            key={t.tenantId}
                            tenantId={t.tenantId}
                            firstName={t.firstName}
                            lastName={t.lastName}
                            phoneNo={t.phoneNo}
                            removeTenant={() => this.removeFromTenants(t.tenantId)}/>
                    )
                })}
                <Button onClick={this.toggleAdd}>+</Button>
                {addTenant}
                <Popup show={showPopup}
                       close={() => this.props.closePopup()}
                       title={popupTitle}
                       actions={popupActions}/>
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
        closePopup: () => dispatch(viewActions.closePopup()),
        closeSubChildrenFrame: (view) => dispatch(viewActions.closeSubChildrenFrame(view))
    };
};

Tenants.propTypes = {
    tenantId: PropTypes.number,
    firstName: PropTypes.string,
    lastName: PropTypes.string,
    phoneNo: PropTypes.string
};

export default connect(mapStateToProps, mapDispatchToProps)(Tenants);