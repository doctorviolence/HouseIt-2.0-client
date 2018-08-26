import React, {Component} from 'react';
import {connect} from 'react-redux';
import styled from 'styled-components';
import PropTypes from "prop-types";

import * as apiActions from '../../api/actions';
import * as viewActions from '../actions';
import TaskMessage from "../message/Message";
import MessageData from '../message/MessageData';
import Popup from '../../components/ui/popup/Popup';

const Container = styled.div`
    align-items: flex-end;
    justify-content: center;
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

class Messages extends Component {
    state = {
        add: false,
        error: false,
        taskMessageSelectedId: null
    };

    componentDidMount() {
        if (!this.props.apiState.data.taskMessages.length) {
            this.props.retrieveTaskMessages();
        }
    }

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
        this.props.viewPopup({
            title: 'Task message deleted!'
        });
        this.props.removeTaskMessage(id);
    };

    render() {
        const {showPopup, popupTitle, popupActions} = this.props.viewState;
        const taskMessages = this.props.apiState.data.taskMessages;

        let addTaskMessage = null;
        if (this.state.add) {
            addTaskMessage = <MessageData add={this.state.add}
                                          title={"Add new task message"}
                                          toggleAdd={this.toggleAdd}
                                          addTaskMessage={this.addToTaskMessages}/>
        }

        return (
            <Container>
                <Button onClick={this.props.goBack}>‹ Cancel</Button>
                {taskMessages.map((t) => {
                    return (
                        <TaskMessage
                            key={t.messageNo}
                            id={t.messageNo}
                            messageNo={t.messageNo}
                            messageText={t.messageText}
                            removeTaskMessage={() => this.removeFromTaskMessages(t.messageNo)}/>
                    )
                })}
                <Button onClick={this.toggleAdd}>+</Button>
                {addTaskMessage}
                <Popup show={showPopup}
                       close={() => this.props.closePopup()}
                       title={popupTitle}
                       actions={popupActions}/>
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
        retrieveTaskMessages: () => dispatch(apiActions.retrieveTaskMessages()),
        addTaskMessage: (taskMessage) => dispatch(apiActions.addTaskMessage(taskMessage)),
        removeTaskMessage: (id) => dispatch(apiActions.removeTaskMessage(id)),
        viewPopup: (popup) => dispatch(viewActions.viewPopup(popup)),
        closePopup: () => dispatch(viewActions.closePopup()),
        //viewApartments: (view) => dispatch(viewActions.viewApartments(view))
    };
};

Messages.propTypes = {
    messageNo: PropTypes.number,
    text: PropTypes.string
};

export default connect(mapStateToProps, mapDispatchToProps)(Messages);