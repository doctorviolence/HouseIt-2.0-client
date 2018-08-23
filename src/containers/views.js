import React, {Component} from 'react';
import {connect} from 'react-redux';
import styled from "styled-components";

import * as viewActions from './actions';
import Buildings from "./buildings_list/Buildings";

const Container = styled.div`
    position: relative;
    align-items: center;
    justify-content: space-between;
`;

class Views extends Component {
    render() {
        if (!this.props.isTenant) {
            return (
                <Buildings/>
            );
        }
        return <p>You are a tenant.</p>;
    };
}

const mapStateToProps = state => {
    return {
        isTenant: state.containerState.tenantId !== null,
        viewState: state.containerState
    };
};


const mapDispatchToProps = dispatch => {
    return {

    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Views);