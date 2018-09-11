import React, {Component} from 'react';
import {connect} from 'react-redux';

import * as apiActions from '../../api/actions';
import * as viewActions from '../actions';
import {AddButton, Container, PageContainer, Menu, MenuButton, Title} from "../../components/constants/styles/views";
import Task from '../../components/task/Task';
import TaskData from '../../components/task/Data';
import styled from "styled-components";
import TaskDetails from "../../components/task/details/Details";

const TaskContainer = styled.div``;

const TaskTitle = styled.h2`
    color: #333333;
    font-size: 24px;
    text-align: left;
    margin-left: 32px;
    margin-bottom: 32px;
    cursor: default;
    user-select: none;
    
    @media screen and (max-width: 700px) {
        font-size: 16px;
    }
`;

class Tasks extends Component {
    constructor(props) {
        super(props);

        this.taskSelectedHandler = this.taskSelectedHandler.bind(this);
        this.addToTasks = this.addToTasks.bind(this);
        this.removeFromTasks = this.removeFromTasks.bind(this);
        this.toggleAdd = this.toggleAdd.bind(this);

        this.state = {
            add: false,
            taskSelectedId: null,
            showDetails: false
        };
    }

    componentDidMount() {
        const {tenant} = this.props.viewState;
        if (!tenant && !this.props.apiState.data.tasks.length) {
            this.props.retrieveTasks();
        }
        else {
            if (!this.props.apiState.data.tasks.length) {
                this.props.retrieveTasksByTenant(tenant);
            }
        }
    }

    taskSelectedHandler = (id) => {
        this.setState({taskSelectedId: id});
    };

    toggleAdd = () => {
        this.setState((prevState) => {
            return {add: !prevState.add};
        });
    };

    addToTasks = (data) => {
        this.toggleAdd();
        this.props.addTask(data);
    };

    removeFromTasks = (id) => {
        this.props.removeTask(id);
    };

    render() {
        const tasks = this.props.apiState.data.tasks;
        const {tenant} = this.props.viewState;
        const {apartmentId} = this.props.viewState.apartment;
        const {buildingId} = this.props.viewState.building;

        let taskDetails = null;
        if (this.state.taskSelectedId) {
            taskDetails = <TaskDetails
                id={this.state.taskSelectedId}
                toggleTaskDetails={() => this.taskSelectedHandler()}
                removeTask={() => this.removeFromTasks(this.state.taskSelectedId)}/>;
        }
        let addTask = null;
        if (tenant) {
            addTask = <AddButton onClick={this.toggleAdd}>Add Task...</AddButton>;
        }

        const todoTasks = tasks.filter((t) => t.resolved === false).map(t => {
                return (
                    <Task key={t.taskNo}
                          id={t.taskNo}
                          subject={t.subject}
                          datePosted={t.datePosted}
                          viewMessages={() => this.props.viewFrame('Messages', {
                              taskNo: t.taskNo,
                              subject: t.subject,
                              resolved: t.resolved,
                              datePosted: t.datePosted,
                              tenant: t.tenant,
                              apartment: t.apartment,
                              building: t.building
                          })}
                          clicked={() => this.taskSelectedHandler(t.taskNo)}/>
                )
            }
        );

        const completedTasks = tasks.filter((t) => t.resolved === true).map(t => {
                return (
                    <Task key={t.taskNo}
                          id={t.taskNo}
                          subject={t.subject}
                          datePosted={t.datePosted}
                          viewMessages={() => this.props.viewFrame('Messages', {
                              taskNo: t.taskNo,
                              subject: t.subject,
                              resolved: t.resolved,
                              datePosted: t.datePosted,
                              tenant: t.tenant
                          })}
                          clicked={() => this.taskSelectedHandler(t.taskNo)}/>
                )
            }
        );

        return (
            <Container>
                <Menu>
                    <MenuButton onClick={() => this.props.closeFrame('Menu')}>‹ Menu</MenuButton>
                    <Title>Tasks</Title>
                </Menu>
                <PageContainer>
                    {taskDetails}
                    <TaskContainer>
                        <TaskTitle>To do</TaskTitle>
                        {todoTasks}
                    </TaskContainer>
                    <TaskContainer>
                        <TaskTitle>Completed tasks</TaskTitle>
                        {completedTasks}
                    </TaskContainer>
                    {addTask}
                </PageContainer>
                <TaskData add={this.state.add}
                          title={"Add new task"}
                          toggleAdd={this.toggleAdd}
                          tenant={tenant}
                          apartment={apartmentId}
                          building={buildingId}
                          addTask={this.addToTasks}/>
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
        viewFrame: (view, props) => dispatch(viewActions.viewFrame(view, props)),
        closeFrame: (view) => dispatch(viewActions.closeFrame(view))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Tasks);