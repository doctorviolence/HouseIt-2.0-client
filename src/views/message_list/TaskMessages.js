import React, {Component} from 'react';
import {connect} from 'react-redux';

import * as apiActions from '../../api/actions';
import * as viewActions from '../actions';
import {
    PageContainer,
    Menu,
    Title,
    AddButton,
    MenuButton
} from "../../components/constants/styles/views";
import TaskMessage from "../../components/message/TaskMessage";
import TaskMessageData from "../../components/message/Data";
import TaskMessageDetails from "../../components/message/details/Details";
import styled from "styled-components";

const Container = styled.div`
    width: 100vw;
    display: flex;
    align-items: center;
    transform: ${props => props.newFrame ? 'slideOut' : 'none'} 0.3s ease-in-out;
    animation: ${props => props.newFrame ? 'slideIn' : 'slideOut'} 0.3s ease-in-out;
    transition: all 0.3s ease-in-out;
   
    @keyframes slideOut {
        0% {
            opacity: 0;
            transform: translateX(-20vw);
        }
    }
   
    @keyframes slideIn {
        100% {
            opacity: 0;
            transform: translateX(100vw);
        }  
    }  
    
    @media screen and (max-width: 700px) {
        flex-direction: column;
    }
`;

class TaskMessages extends Component {
    constructor(props) {
        super(props);

        this.taskMessageSelectedHandler = this.taskMessageSelectedHandler.bind(this);
        this.addToTaskMessages = this.addToTaskMessages.bind(this);
        this.removeFromTaskMessages = this.removeFromTaskMessages.bind(this);
        this.toggleAdd = this.toggleAdd.bind(this.props.buildingId);

        this.state = {
            add: false,
            taskMessageSelectedId: null,
            showDetails: false
        };
    }

    componentDidMount() {
        this.props.retrieveTaskMessages(this.props.taskNo);
    }

    taskMessageSelectedHandler = (id) => {
        this.setState({taskMessageSelectedId: id});
    };

    toggleAdd = () => {
        this.setState((prevState) => {
            return {add: !prevState.add};
        });
    };

    addToTaskMessages = (data) => {
        this.toggleAdd();
        this.props.addTaskMessage(data);
    };

    removeFromTaskMessages = (id) => {
        this.props.removeTaskMessage(id);
    };

    render() {
        const taskMessages = this.props.apiState.data.taskMessages;
        const task = {
            taskNo: this.props.taskNo,
            taskType: this.props.type,
            taskDate: this.props.taskDate,
            resolved: this.props.resolved
        };

        let taskMessageDetails = null;
        if (this.state.taskMessageSelectedId) {
            taskMessageDetails = <TaskMessageDetails
                id={this.state.taskMessageSelectedId}
                task={task}
                toggleTaskMessageDetails={() => this.taskMessageSelectedHandler()}
                removeTaskMessage={() => this.removeFromTaskMessages(this.state.taskMessageSelectedId)}/>;
        }
        return (
            <Container newFrame={this.props.newFrame}>
                <Menu>
                    <MenuButton onClick={() => this.props.closeFrame('Tasks')}>‹ Tasks</MenuButton>
                </Menu>
                <PageContainer>
                    <Title>Messages in <i>{this.props.type}</i></Title>
                    {taskMessageDetails}
                    {taskMessages.map((t) => {
                        return (
                            <TaskMessage
                                key={t.messageNo}
                                id={t.messageNo}
                                timePosted={t.timePosted}
                                messageText={t.messageText}
                                clicked={() => this.taskMessageSelectedHandler(t.messageNo)}/>
                        )
                    })}
                    <AddButton onClick={this.toggleAdd}>+</AddButton>
                </PageContainer>
                <TaskMessageData add={this.state.add}
                                 title={"Write new message"}
                                 toggleAdd={this.toggleAdd}
                                 taskNo={this.props.taskNo}
                                 addTaskMessage={this.addToTaskMessages}/>
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
        retrieveTaskMessages: (taskNo) => dispatch(apiActions.retrieveTaskMessages(taskNo)),
        addTaskMessage: (taskMessage) => dispatch(apiActions.addTaskMessage(taskMessage)),
        removeTaskMessage: (id) => dispatch(apiActions.removeTaskMessage(id)),
        closeFrame: (view) => dispatch(viewActions.closeFrame(view))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(TaskMessages);