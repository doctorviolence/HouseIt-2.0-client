import React, {Component} from 'react';
import {connect} from 'react-redux';

import {Container, TextContainer, Button} from "../../components/constants/components";
import * as actions from '../../api/actions';
import TaskData from './TaskData';
import * as viewActions from "../actions";

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
            <Container key={this.props.id}>
                <TextContainer>
                    {this.props.taskType}
                </TextContainer>
                <TextContainer>
                    {this.props.taskStatus}
                </TextContainer>
                <TextContainer>
                    {this.props.taskDate}
                </TextContainer>
                <TextContainer>
                    {this.props.fixDate}
                </TextContainer>
                <TextContainer>
                    {this.props.resolved}
                </TextContainer>
                <Button onClick={() => this.props.viewFrame('Messages', {taskNo: this.props.id})}>Show
                    Messages</Button>
                <Button onClick={this.toggleEdit}>Edit</Button>
                {editTask}
                <Button onClick={() => this.props.removeTask(this.props.id)}>Remove</Button>
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
        viewFrame: (view, props) => dispatch(viewActions.viewFrame(view, props)),
        viewPopup: (popup) => dispatch(viewActions.viewPopup(popup)),
        editTask: (task, id) => dispatch(actions.editTask(task, id))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Task);