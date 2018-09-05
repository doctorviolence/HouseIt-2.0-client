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
import TenantData from "../Data";
import UserData from "../../user/Data";

class TenantDetails extends Component {
    constructor(props) {
        super(props);

        this.toggleEdit = this.toggleEdit.bind(this);
        this.editTenant = this.editTenant.bind(this);
        this.removeTenant = this.removeTenant.bind(this);

        this.state = {
            addUser: false,
            edit: false
        };
    }

    toggleAddUser = () => {
        this.setState((prevState) => {
            return {addUser: !prevState.addUser};
        });
    };

    addUser = (data) => {
        this.toggleAddUser();
        this.props.addUser(data);
    };

    toggleEdit = () => {
        this.setState((prevState) => {
            return {edit: !prevState.edit};
        });
    };

    editTenant = (data, id) => {
        this.toggleEdit();
        this.props.editTenant(data, id);
    };

    removeTenant = (id) => {
        this.props.removeTenant(id);
        this.props.toggleTenantDetails();
    };

    getTenantDetails = (id) => {
        const tenants = this.props.apiState.data.tenants;
        return tenants.filter((t) => t.tenantId === id);
    };

    render() {
        let tenant = null;
        if (this.props.id) {
            const t = this.getTenantDetails(this.props.id);
            const {tenantId, firstName, lastName, phoneNo, email} = t[0];

            tenant = (
                <Container>
                    <DetailsContainer>
                        <DetailsClose>
                            <CloseButton onClick={() => this.props.toggleTenantDetails()}>&times;</CloseButton>
                        </DetailsClose>
                        <DetailsText>
                            <DetailsTitle>Tenant</DetailsTitle>
                            <Text><Label>First name:</Label> {firstName}</Text>
                            <Text><Label>Last Name:</Label> {lastName}</Text>
                            <Text><Label>Phone No:</Label> {phoneNo}</Text>
                            <Text><Label>Email:</Label> {email}</Text>
                        </DetailsText>
                        <ButtonContainer>
                            <Button onClick={this.toggleAddUser}>Add user</Button>
                            <Button onClick={this.toggleEdit}>Edit</Button>
                            <Button onClick={() => this.removeTenant(tenantId)}>Remove</Button>
                        </ButtonContainer>
                    </DetailsContainer>
                    <TenantData id={tenantId}
                                edit={this.state.edit}
                                title={"Edit tenant"}
                                toggleEdit={this.toggleEdit}
                                editTenant={this.editTenant}
                                tenantId={tenantId}
                                firstName={firstName}
                                lastName={lastName}
                                phoneNo={phoneNo}
                                email={email}
                                apartment={this.props.apartment}/>
                    <UserData id={tenantId}
                              add={this.state.addUser}
                              title={"Add user"}
                              toggleAddUser={this.toggleAddUser}
                              addUser={this.addUser}
                              tenantId={tenantId}
                              firstName={firstName}
                              lastName={lastName}
                              phoneNo={phoneNo}
                              email={email}
                              apartment={this.props.apartment}/>
                    <Backdrop onClick={() => this.props.toggleTenantDetails()}/>
                </Container>
            );
        }
        return tenant;
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
        addUser: (user) => dispatch(apiActions.addUser(user)),
        editTenant: (tenant, id) => dispatch(apiActions.editTenant(tenant, id)),
        viewFrame: (view, props) => dispatch(viewActions.viewFrame(view, props)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(TenantDetails);