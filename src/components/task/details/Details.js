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
import styled from "styled-components";

export const ResolvedButton = styled.button`
    width: 150px;
    color: #CC0033;
    background: #ffffff;
    border: none;
    font-size: 14px;
    font-weight: bold;
    color: ${props => props.alreadyResolved ? '#999999' : '#CC0033'};
    pointer-events: ${props => props.alreadyResolved ? 'none' : 'auto'}; 
    cursor: pointer;
    user-select: none;
    
    @media screen and (max-width: 700px) {
        font-size: 12px;
        width: 100px;
    }
`;

class TaskDetails extends Component {
    constructor(props) {
        super(props);

        this.toggleEdit = this.toggleEdit.bind(this);
        this.editTask = this.editTask.bind(this);
        this.removeTask = this.removeTask.bind(this);

        this.state = {
            edit: false
        };
    }

    toggleEdit = () => {
        this.setState((prevState) => {
            return {edit: !prevState.edit};
        });
    };

    editTask = (id) => {
        const tasks = this.props.apiState.data.tasks;
        const task = tasks.filter((t) => t.taskNo === id);
        const updatedTask = {
            taskNo: task[0].taskNo,
            taskDate: task[0].taskDate,
            taskType: task[0].taskType,
            resolved: true,
            tenant: task[0].tenant,
            apartment: task[0].apartment,
            building: task[0].building,
        };
        this.props.editTask(updatedTask, id);
    };

    removeTask = (id) => {
        this.props.removeTask(id);
        this.props.toggleTaskDetails();
    };

    getTaskDetails = (id) => {
        const tasks = this.props.apiState.data.tasks;
        return tasks.filter((b) => b.taskNo === id);
    };

    render() {
        let task = null;

        if (this.props.id) {
            const t = this.getTaskDetails(this.props.id);
            const {taskNo, subject, resolved, datePosted, tenant, apartment, building} = t[0];
            const alreadyResolved = resolved === true;

            task = (
                <Container>
                    <DetailsContainer>
                        <DetailsClose>
                            <CloseButton onClick={() => this.props.toggleTaskDetails()}>&times;</CloseButton>
                        </DetailsClose>
                        <DetailsText>
                            <DetailsTitle>{datePosted}</DetailsTitle>
                            <Text><Label>Subject:</Label> {subject}</Text>
                            <Text><Label>Date:</Label> {datePosted}</Text>
                            <Text><Label>Tenant:</Label> {tenant.firstName}</Text>
                            <Text><Label>Apartment:</Label> {apartment.apartmentNo}</Text>
                            <Text><Label>Building:</Label> {building.name}</Text>
                        </DetailsText>
                        <ButtonContainer>
                            <ResolvedButton onClick={() => this.editTask(this.props.id)}
                                            alreadyResolved={alreadyResolved}>Mark as resolved</ResolvedButton>
                            <Button onClick={() => this.removeTask(this.props.id)}>Remove</Button>
                        </ButtonContainer>
                    </DetailsContainer>
                    <Backdrop onClick={() => this.props.toggleTaskDetails()}/>
                </Container>
            );
        }
        return task;
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
        retrieveTask: (id) => dispatch(apiActions.retrieveTask(id)),
        editTask: (task, id) => dispatch(apiActions.editTask(task, id)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(TaskDetails);