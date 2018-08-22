import React, {Component} from 'react';
import {connect} from 'react-redux';
import styled from 'styled-components';

import * as actions from '../../api/actions';
import Building from '../building/Building';
import Add from '../../components/add/Add';
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
        error: false
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
        this.props.removeBuilding(id);
    };

    render() {
        const buildings = this.props.apiState.data.buildings;

        return (
            <Container>
                {buildings.map((b) => {
                    return (
                        <Building
                            key={b.buildingId}
                            id={b.buildingId}
                            streetAddress={b.address}
                            removeBuilding={() => this.removeFromBuildings(b.buildingId)}/>
                    )
                })}
                <Add display={this.state.add}
                     title={"Add new building"}
                     addForm={this.state.addForm}
                     toggleAdd={this.toggleAdd}
                     submitData={this.addToBuildings}
                     addFormChanged={(event) => this.changeAddFormHandler(event)}/>
            </Container>
        );
    }
}

const mapStateToProps = state => {
    return {
        apiState: state.apiState
    };
};

const mapDispatchToProps = dispatch => {
    return {
        retrieveBuildings: () => dispatch(actions.retrieveBuildings()),
        addBuilding: (building) => dispatch(actions.addBuilding(building)),
        removeBuilding: (id) => dispatch(actions.removeBuilding(id))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Buildings);