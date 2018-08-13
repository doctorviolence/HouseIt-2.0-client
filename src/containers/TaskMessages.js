import React, {Component} from 'react';
import * as api from '../api/apiTaskMessage';
import styled from "styled-components";

import TaskMessage from "../components/taskmessage/TaskMessage";
import Add from "../components/taskmessage/Add";
import {Route} from "react-router-dom";
import Edit from "../components/building/Edit";

const Container = styled.div`
    align-items: flex-end;
    justify-content: center;
`;

class TaskMessages extends Component {
    constructor() {
        super();

        this.addToTaskMessages = this.addToTaskMessages.bind(this);
        this.removeFromTaskMessages = this.removeFromTaskMessages.bind(this);

        this.state = {
            taskMessages: [],
            error: false
        }
    }

    shouldComponentUpdate(nextProps) {
        return nextProps.taskMessages !== this.state.taskMessages;
    }

    componentDidMount() {
        this.loadData();
    }

    taskMessageSelectedHandler = (messageNo) => {
        this.props.history.push('/messages/' + messageNo)
    };

    loadData = () => {
        const queryToken = localStorage.getItem('token');

        api.getAllTaskMessages(queryToken).then(result => {
            this.setState({taskMessages: result});
        }).catch(e => {
            console.log('Error loading task messages:', e);
            this.setState({error: true});
        })
    };

    addToTaskMessages = (taskMessage) => {
        const updated = [...this.state.taskMessages];
        updated.push(taskMessage);
        this.setState({taskMessages: updated});
    };

    removeFromTaskMessages = (id) => {
        const queryToken = localStorage.getItem('token');

        api.deleteTaskMessage(id, queryToken).then(result => {
                if (result.status === 500 && result !== null) {
                    console.log(result.error);
                    return;
                }

                const taskMessages = [...this.state.taskMessages];
                const updated = taskMessages.filter(el => {
                    return el.messageNo !== id;
                });
                this.setState({taskMessages: updated});
            }
        ).catch(e => {
            console.log(e);
        });
    };

    render() {
        let taskMessages = <p>There are no tasks messages currently available.</p>;
        if (!this.state.error) {
            taskMessages = this.state.taskMessages.map(t => {
                    return (
                        <Container key={t.messageNo}>
                            <TaskMessage
                                key={t.messageNo}
                                messageNo={t.messageNo}
                                text={t.messageText}
                                clicked={() => this.taskMessageSelectedHandler(t.messageNo)}
                                removeTaskMessage={() => this.removeFromTaskMessages(t.messageNo)}/>
                        </Container>
                    )
                }
            );
        }

        return (
            <Container>
                <h1>Task Messages</h1>
                {taskMessages}
                <Add addToTaskMessages={this.addToTaskMessages}/>
                <Route path={this.props.match.url + '/:no'} exact component={Edit}/>
            </Container>
        );
    }
}

export default TaskMessages;