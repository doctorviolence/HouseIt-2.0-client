import React, {Component} from 'react';
import {connect} from 'react-redux';

import {Container, ButtonContainer, Button} from "../../components/constants/components";
import * as actions from '../../api/actions';
import TenantData from "../tenant/TenantData";
import * as viewActions from "../actions";
import styled from "styled-components";

export const TenantContainer = styled.div`
    width: 100%;
    margin: auto;
    display: flex;
    text-align: left;
    align-items: center;
    justify-content: space-between;
    user-select: none;
    
    @media screen and (max-width: 700px) {
        text-align: left;
        flex-direction: column;
        margin-bottom: 20px;
    }
`;

class Tenant extends Component {
    state = {
        edit: false,
        error: false
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

    render() {
        let editTenant = null;
        if (this.state.edit) {
            editTenant = <TenantData id={this.props.tenantId}
                                     edit={this.state.edit}
                                     title={"Edit tenant"}
                                     toggleEdit={this.toggleEdit}
                                     editTenant={this.editTenant}
                                     tenantd={this.props.tenantId}
                                     firstName={this.props.firstName}
                                     lastName={this.props.lastName}
                                     phoneNo={this.props.phoneNo}
                                     apartmentId={this.props.apartmentId}/>
        }

        return (
            <Container key={this.props.id}>
                <TenantContainer>
                    <b>First name:</b> {this.props.firstName}
                    <b>Last name:</b> {this.props.lastName}
                    <b>Phone No.:</b> {this.props.phoneNo}
                    <ButtonContainer>
                        <Button onClick={this.toggleEdit}>Edit</Button>
                        <Button onClick={() => this.props.removeTenant(this.props.tenantId)}>Remove</Button>
                    </ButtonContainer>
                </TenantContainer>
                {editTenant}
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
        viewPopup: (popup) => dispatch(viewActions.viewPopup(popup)),
        editTenant: (tenant, id) => dispatch(actions.editTenant(tenant, id))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Tenant);