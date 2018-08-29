import React, {Component} from 'react';
import {connect} from 'react-redux';
import styled from "styled-components";

import {Button} from "../../components/constants/components";
import * as actions from '../../api/actions';
import TaskData from './TaskData';
import * as viewActions from "../actions";

const TaskElement = styled.div`
    width: 150px;
    max-width: 150px;
    height: 150px;
    max-height: 150px;
    margin-right: 40px;
    margin-bottom: 40px;
    border: 1px solid #f2f2f2;
    flex: 1 1 30%;
    justify-content: center;
    
    @media screen and (max-width: 700px) {
        width: 100px;
        max-width: 100px;
        height: 100px;
        max-height: 100px;
        margin-right: auto;
        margin-left: auto;
        flex: 1 1 40%;
    }
`;

const TextContainer = styled.div`
    height: 70px;
    text-align: center;
    font-size: 14px;
    font-weight: bold;
    display: flex;
    flex-direction: column;
    justify-content: center;
    cursor: default;
    user-select: none;
    
    &:hover {
        font-size: 16px;
    }
`;

const ButtonContainer = styled.div`
    height: 40px;
    display: flex;
    justify-content: space-between;
    
    @media screen and (max-width: 700px) {
        height: 40px;
    }
`;

class Task extends Component {
    state = {
        edit: false,
        error: false
    };

    toggleEdit = () => {
        this.setState((prevState) => {
            return {edit: !prevState.edit};
        });
    };

    editTask = (data, id) => {
        this.toggleEdit();
        this.props.editTask(data, id);
    };

    render() {
        let editTask = null;
        if (this.state.edit) {
            editTask = <TaskData id={this.props.id}
                                 edit={this.state.edit}
                                 title={"Edit task"}
                                 toggleEdit={this.toggleEdit}
                                 editTask={this.editTask}
                                 taskNo={this.props.taskNo}
                                 taskType={this.props.taskType}
                                 taskStatus={this.props.taskStatus}
                                 resolved={this.props.resolved}
                                 taskDate={this.props.taskDate}
                                 fixDate={this.props.fixDate}/>
        }

        return (
            <TaskElement key={this.props.id}>
                <TextContainer onClick={() => this.props.viewFrame('Messages', {
                    taskNo: this.props.id,
                    type: this.props.taskType,
                    status: this.props.taskStatus,
                    date: this.props.taskDate,
                    fixDate: this.props.fixDate,
                    resolved: this.props.resolved
                })}>
                    {this.props.taskDate}
                </TextContainer>
                <ButtonContainer>
                    <Button onClick={this.toggleEdit}>Edit</Button>
                    <Button onClick={() => this.props.removeTask(this.props.id)}>Remove</Button>
                </ButtonContainer>
                {editTask}
            </TaskElement>
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
        viewFrame: (view, props) => dispatch(viewActions.viewFrame(view, props)),
        viewPopup: (popup) => dispatch(viewActions.viewPopup(popup)),
        editTask: (task, id) => dispatch(actions.editTask(task, id))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Task);