import React, {Component} from 'react';
import {connect} from 'react-redux';
import PropTypes from "prop-types";

import * as apiActions from '../../api/actions';
import * as viewActions from '../actions';
import {
    Container,
    DetailsContainer,
    DetailsTitle,
    DetailsText,
    PageContainer,
    Menu,
    Title,
    AddButton
} from "../../components/constants/views";
import TaskMessage from "../message/Message";
import MessageData from '../message/MessageData';

class Messages extends Component {
    state = {
        add: false,
        error: false,
        taskMessageSelectedId: null
    };

    componentDidMount() {
        this.props.retrieveTaskMessages(this.props.taskNo);
    }

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

        let addTaskMessage = null;
        if (this.state.add) {
            addTaskMessage = <MessageData add={this.state.add}
                                          title={"Add new task message"}
                                          toggleAdd={this.toggleAdd}
                                          taskNo={this.props.taskNo}
                                          addTaskMessage={this.addToTaskMessages}/>
        }

        return (
            <Container>
                <Menu onClick={() => this.props.closeFrame('Tasks', {taskNo: this.props.taskNo})}>‹ Tasks</Menu>
                <DetailsContainer>
                    <DetailsTitle>Task</DetailsTitle>
                    <DetailsText>
                        Task No.: {this.props.taskNo}
                    </DetailsText>
                    <DetailsText>
                        Type: {this.props.type}
                    </DetailsText>
                    <DetailsText>
                        Status: {this.props.status}
                    </DetailsText>
                    <DetailsText>
                        Date posted: {this.props.date}
                    </DetailsText>
                    <DetailsText>
                        Fix date: {this.props.fixDate}
                    </DetailsText>
                    <DetailsText>
                        Resolved: {this.props.resolved}
                    </DetailsText>
                </DetailsContainer>
                <PageContainer>
                    <Title>Messages</Title>
                    {taskMessages.map((t) => {
                        return (
                            <TaskMessage
                                key={t.messageNo}
                                id={t.messageNo}
                                messageNo={t.messageNo}
                                messageText={t.messageText}
                                taskNo={this.props.taskNo}
                                removeTaskMessage={() => this.removeFromTaskMessages(t.messageNo)}/>
                        )
                    })}
                    <AddButton onClick={this.toggleAdd}>+</AddButton>
                </PageContainer>
                {addTaskMessage}
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
        closePopup: () => dispatch(viewActions.closePopup()),
        closeFrame: (view) => dispatch(viewActions.closeFrame(view))
    };
};

Messages.propTypes = {
    messageNo: PropTypes.number,
    text: PropTypes.string
};

export default connect(mapStateToProps, mapDispatchToProps)(Messages);