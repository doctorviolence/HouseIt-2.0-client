import React, {Component} from 'react';
import {connect} from 'react-redux';
import styled from 'styled-components';

import * as apiActions from '../../api/actions';
import * as viewActions from '../../containers/actions';
import Building from '../building/Building';
import Add from '../../components/add/Add';
import Popup from '../../components/ui/popup/Popup';
import {validation} from '../../components/constants/validation';

const Container = styled.div`
    align-items: flex-end;
    justify-content: center;
`;

class Buildings extends Component {
    state = {
        addForm: {
            streetAddress: {
                formType: 'input',
                description: 'Address',
                formConfig: {
                    type: 'text',
                    name: 'streetAddress',
                    placeholder: 'Address'
                },
                value: '',
                validation: {
                    required: true
                },
                valid: false
            },
            floors: {
                formType: 'input',
                description: 'Floors',
                formConfig: {
                    type: 'number',
                    name: 'floors',
                    placeholder: 'Floors'
                },
                value: '',
                validation: {
                    required: true,
                    number: true
                },
                valid: false
            }
        },
        formIsValid: false,
        add: false,
        error: false,
        buildingSelectedId: null
    };

    componentDidMount() {
        if (!this.props.apiState.data.buildings.length) {
            this.props.retrieveBuildings();
        }
    }

    toggleAdd = () => {
        this.setState((prevState) => {
            return {add: !prevState.add};
        });
    };

    viewApartments = () => {
        this.props.viewApartments();
    };

    changeAddFormHandler = (event) => {
        event.preventDefault();
        const updatedAddForm = {...this.state.addForm};
        const updatedForm = {...updatedAddForm[event.target.name]};
        updatedForm.value = event.target.value;
        updatedForm.valid = validation(event.target.value, updatedForm.validation);
        updatedAddForm[event.target.name] = updatedForm;

        let isValid = true;
        for (let i in updatedAddForm) {
            isValid = updatedAddForm[i].valid && isValid;
        }

        this.setState({addForm: updatedAddForm, formIsValid: isValid});
    };

    addToBuildings = () => {
        const data = {
            id: null,
            address: this.state.addForm.streetAddress.value
        };

        if (this.state.formIsValid) {
            this.toggleAdd();
            this.props.addBuilding(data);
        } else {
            // Replacing this with error message, eventually...
        }
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
                <Add display={this.state.add}
                     title={"Add new building"}
                     addForm={this.state.addForm}
                     toggleAdd={this.toggleAdd}
                     submitData={this.addToBuildings}
                     addFormChanged={(event) => this.changeAddFormHandler(event)}/>
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
        retrieveBuildings: () => dispatch(apiActions.retrieveBuildings()),
        addBuilding: (building) => dispatch(apiActions.addBuilding(building)),
        removeBuilding: (id) => dispatch(apiActions.removeBuilding(id)),
        viewPopup: (popup) => dispatch(viewActions.viewPopup(popup)),
        closePopup: () => dispatch(viewActions.closePopup()),
        viewApartments: (view) => dispatch(viewActions.viewApartments(view))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Buildings);