import React, {Component} from 'react';
import {connect} from 'react-redux';
import styled from "styled-components";

import * as viewActions from './actions';
import Buildings from "./buildings_list/Buildings";

/*const Container = styled.div`
    position: relative;
    align-items: center;
    justify-content: space-between;
`;*/

const ViewContainer = styled.div``;

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

class Views extends Component {
    state = {
        showBuildings: this.props.showBuildings
    };

    viewChangeHandler = () => {
        this.setState((prevState) => {
            return {showBuildings: !prevState.showBuildings};
        });
    };

    render() {
        let buildings = null;
        if (this.state.showBuildings) {
            buildings = <Buildings onDisplay={this.viewChangeHandler}/>
        }

        if (!this.props.isTenant) {
            return (
                <ViewContainer>
                    <Button onClick={this.viewChangeHandler}>Buildings ></Button>
                    {buildings}
                </ViewContainer>
            );
        }
        return <p>You are a tenant.</p>;
    };
}

const mapStateToProps = state => {
    return {
        isTenant: state.containerState.tenantId !== null,
        showBuildings: state.containerState.showBuildings,
        viewState: state.containerState
    };
};


const mapDispatchToProps = dispatch => {
    return {
        viewBuildings: (view) => dispatch(viewActions.viewBuildings(view))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Views);