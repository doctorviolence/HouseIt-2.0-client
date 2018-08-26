import React, {Component} from 'react';
import {connect} from 'react-redux';

import {Container, TextContainer, Button} from "../../components/constants/components";
import * as actions from '../../api/actions';
import TenantData from "../tenant/TenantData";

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
                                     phoneNo={this.props.phoneNo}/>
        }

        return (
            <Container key={this.props.id}>
                <TextContainer>
                    {this.props.tenantId}
                </TextContainer>
                <TextContainer>
                    {this.props.firstName}
                </TextContainer>
                <TextContainer>
                    {this.props.lastName}
                </TextContainer>
                <TextContainer>
                    {this.props.phoneNo}
                </TextContainer>
                <Button onClick={this.toggleEdit}>Edit</Button>
                {editTenant}
                <Button onClick={() => this.props.removeTenant(this.props.tenantId)}>Remove</Button>
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
        editTenant: (tenant, id) => dispatch(actions.editTenant(tenant, id))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Tenant);