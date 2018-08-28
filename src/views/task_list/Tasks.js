import React, {Component} from 'react';
import {connect} from 'react-redux';
import styled from 'styled-components';
import PropTypes from "prop-types";

import * as apiActions from '../../api/actions';
import * as viewActions from '../actions';
import Task from "../task/Task";
import TaskData from '../task/TaskData';

const Container = styled.div`
    align-items: flex-end;
    justify-content: center;
`;

const Title = styled.h2`
    color: #000000;
    font-size: 30px;
    font-weight: bold;
    cursor: pointer;
    
    @media screen and (max-width: 700px) {
        font-size: 20px;
    }
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

class Tasks extends Component {
    state = {
        add: false,
        error: false,
        taskSelectedId: null
    };

    componentDidMount() {
        const {tenant} = this.props.viewState;

        if (!tenant) {
            this.props.retrieveTasks();
        }
        else {
            this.props.retrieveTasksByTenant(tenant);
        }
    }

    toggleAdd = () => {
        this.setState((prevState) => {
            return {add: !prevState.add};
        });
    };

    addToTasks = (data) => {
        this.props.viewPopup({
            title: 'Task added...'
        });
        this.toggleAdd();
        this.props.addTask(data);
    };

    removeFromTasks = (id) => {
        this.props.viewPopup({
            title: 'Task deleted...'
        });
        this.props.removeTask(id);
    };

    render() {
        const {tenant} = this.props.viewState;
        const tasks = this.props.apiState.data.tasks;

        let addTask = null;
        if (this.state.add && !tenant) {
            addTask = <TaskData add={this.state.add}
                                title={"Add new task"}
                                toggleAdd={this.toggleAdd}
                                addTask={this.addToTasks}/>
        }
        else {
            addTask = <TaskData add={this.state.add}
                                title={"Add new task"}
                                tenant={tenant}
                                toggleAdd={this.toggleAdd}
                                addTask={this.addToTasks}/>
        }

        return (
            <Container>
                <Title onClick={() => this.props.closeFrame('Menu')}>‹ Tasks</Title>
                {tasks.map((t) => {
                    return (
                        <Task
                            key={t.taskNo}
                            id={t.taskNo}
                            taskNo={t.taskNo}
                            taskType={t.taskType}
                            taskStatus={t.taskStatus}
                            resolved={t.resolved}
                            taskDate={t.taskDate}
                            fixDate={t.fixDate}
                            removeTask={() => this.removeFromTasks(t.taskNo)}/>
                    )
                })}
                <Button onClick={this.toggleAdd}>+</Button>
                {addTask}
            </Container>
        );
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
        retrieveTasks: () => dispatch(apiActions.retrieveTasks()),
        retrieveTasksByTenant: (id) => dispatch(apiActions.retrieveTasksByTenant(id)),
        addTask: (task) => dispatch(apiActions.addTask(task)),
        removeTask: (id) => dispatch(apiActions.removeTask(id)),
        viewPopup: (popup) => dispatch(viewActions.viewPopup(popup)),
        closeFrame: (view) => dispatch(viewActions.closeFrame(view))
    };
};

Tasks.propTypes = {
    taskNo: PropTypes.number,
    taskType: PropTypes.string,
    taskStatus: PropTypes.string,
    resolved: PropTypes.string,
    taskDate: PropTypes.string,
    fixDate: PropTypes.string
};

export default connect(mapStateToProps, mapDispatchToProps)(Tasks);