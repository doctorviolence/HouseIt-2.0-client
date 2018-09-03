import React, {Component} from 'react';
import {connect} from 'react-redux';

import * as apiActions from '../../api/actions';
import * as viewActions from '../actions';
import {
    Container,
    PageContainer,
    Menu,
    Title,
    AddButton,
    MenuButton
} from "../../components/constants/styles/views";
import TaskMessage from "../../components/message/TaskMessage";
import TaskMessageData from "../../components/message/Data";
import TaskMessageDetails from "../../components/message/details/Details";


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
        this.props.viewPopup({
            title: 'Message added...'
        });
        this.toggleAdd();
        this.props.addTaskMessage(data);
    };

    removeFromTaskMessages = (id) => {
        this.props.viewPopup({
            title: 'Message deleted...'
        });
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
            <Container>
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
        viewPopup: (popup) => dispatch(viewActions.viewPopup(popup)),
        closeFrame: (view) => dispatch(viewActions.closeFrame(view))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(TaskMessages);