import React, {Component} from 'react';
import {connect} from 'react-redux';
import PropTypes from "prop-types";

import * as apiActions from '../../api/actions';
import * as viewActions from '../actions';
import {Container, DetailsContainer, DetailsTitle, PageContainer, Menu, AddButton} from "../../components/constants/views";
import Task from "../task/Task";
import TaskData from '../task/TaskData';
import styled from "styled-components";

const TaskContainer = styled.div`
    width: 100%;
    display: flex;
    flex-wrap: wrap;
`;

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
                <Menu onClick={() => this.props.closeFrame('Menu')}>‹ Menu</Menu>
                <DetailsContainer>
                    <DetailsTitle>Tasks</DetailsTitle>
                </DetailsContainer>
                <PageContainer>
                    <TaskContainer>
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
                        <TaskElement>
                            <AddButton onClick={this.toggleAdd}>+</AddButton>
                        </TaskElement>
                    </TaskContainer>
                </PageContainer>
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