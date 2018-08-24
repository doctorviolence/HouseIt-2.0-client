import React, {Component} from 'react';
import {connect} from 'react-redux';
import styled from 'styled-components';

import * as apiActions from '../../api/actions';
import * as viewActions from '../actions';
import Building from '../building/Building';
import AddBuilding from '../building/BuildingData';
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

class Buildings extends Component {
    state = {
        add: false,
        error: false,
        buildingSelectedId: null
    };

    componentDidMount() {
        if (!this.props.apiState.data.buildings.length) {
            this.props.retrieveBuildings();
        }
    }

    //viewApartments = () => {
    //    this.props.viewApartments();
    //};

    toggleAdd = () => {
        this.setState((prevState) => {
            return {add: !prevState.add};
        });
    };

    addToBuildings = (data) => {
        this.toggleAdd();
        this.props.addBuilding(data);
    };

    removeFromBuildings = (id) => {
        this.props.viewPopup({
            title: 'Building deleted!'
        });
        this.props.removeBuilding(id);
    };

    render() {
        const buildings = this.props.apiState.data.buildings;
        const showPopup = this.props.viewState.showPopup;
        const popupTitle = this.props.viewState.popupTitle;
        const popupActions = this.props.viewState.popupActions;

        let addBuilding = null;
        if (this.state.add) {
            addBuilding = <AddBuilding add={this.state.add}
                                       title={"Add new building"}
                                       toggleAdd={this.toggleAdd}
                                       addBuilding={this.addToBuildings}
            />
        }

        return (
            <Container>
                {buildings.map((b) => {
                    return (
                        <Building
                            key={b.buildingId}
                            id={b.buildingId}
                            streetAddress={b.address}
                            removeBuilding={() => this.removeFromBuildings(b.buildingId)}
                            onClick={this.viewApartments}/>
                    )
                })}
                <Button onClick={this.toggleAdd}>+</Button>
                {addBuilding}
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
        viewState: state.containerState
    };
};

const mapDispatchToProps = dispatch => {
    return {
        viewBuildings: (view) => dispatch(viewActions.viewBuildings(view)),
        retrieveBuildings: () => dispatch(apiActions.retrieveBuildings()),
        addBuilding: (building) => dispatch(apiActions.addBuilding(building)),
        removeBuilding: (id) => dispatch(apiActions.removeBuilding(id)),
        viewPopup: (popup) => dispatch(viewActions.viewPopup(popup)),
        closePopup: () => dispatch(viewActions.closePopup()),
        viewApartments: (view) => dispatch(viewActions.viewApartments(view))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Buildings);