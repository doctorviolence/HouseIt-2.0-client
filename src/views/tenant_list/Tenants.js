import React, {Component} from 'react';
import {connect} from 'react-redux';

import * as apiActions from '../../api/actions';
import * as viewActions from '../actions';
import {
    Container,
    PageContainer,
    Menu,
    Title,
    AddButton,
    MenuButton
} from "../../components/constants/styles/views";
import Tenant from "../../components/tenant/Tenant";
import TenantData from "../../components/tenant/Data";
import TenantDetails from "../../components/tenant/details/Details";


class Tenants extends Component {
    constructor(props) {
        super(props);

        this.tenantSelectedHandler = this.tenantSelectedHandler.bind(this);
        this.addToTenants = this.addToTenants.bind(this);
        this.removeFromTenants = this.removeFromTenants.bind(this);
        this.toggleAdd = this.toggleAdd.bind(this.props.buildingId);

        this.state = {
            add: false,
            tenantSelectedId: null,
            showDetails: false
        };
    }

    componentDidMount() {
        this.props.retrieveTenants(this.props.apartment.apartmentId);
    }

    tenantSelectedHandler = (id) => {
        this.setState({tenantSelectedId: id});
    };

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

        let tenantDetails = null;
        if (this.state.tenantSelectedId) {
            tenantDetails = <TenantDetails
                id={this.state.tenantSelectedId}
                apartment={apartment}
                toggleTenantDetails={() => this.tenantSelectedHandler()}
                removeTenant={() => this.removeFromTenants(this.state.tenantSelectedId)}/>;
        }
        return (
            <Container>
                <Menu>
                    <MenuButton onClick={() => this.props.closeFrame('Apartments',
                        {buildingId: building.buildingId, name: building.name})
                    }>‹ Apartments</MenuButton>
                </Menu>
                <PageContainer>
                    <Title>Tenants in {apartment.apartmentNo}</Title>
                    {tenantDetails}
                    {tenants.map((t) => {
                        return (
                            <Tenant
                                key={t.tenantId}
                                id={t.tenantId}
                                firstName={t.firstName}
                                lastName={t.lastName}
                                clicked={() => this.tenantSelectedHandler(t.tenantId)}/>
                        )
                    })}
                    <AddButton onClick={this.toggleAdd}>+</AddButton>
                </PageContainer>
                <TenantData add={this.state.add}
                            title={"Add new tenant"}
                            toggleAdd={this.toggleAdd}
                            apartment={this.props.apartment}
                            addTenant={this.addToTenants}/>
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
        retrieveTenants: (id) => dispatch(apiActions.retrieveTenants(id)),
        addTenant: (tenant) => dispatch(apiActions.addTenant(tenant)),
        removeTenant: (id) => dispatch(apiActions.removeTenant(id)),
        viewPopup: (popup) => dispatch(viewActions.viewPopup(popup)),
        closeFrame: (view, props) => dispatch(viewActions.closeFrame(view, props))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Tenants);