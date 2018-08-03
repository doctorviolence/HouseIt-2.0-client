import React, {Component} from 'react';
import * as api from '../api/apiTaskMessage';

import TaskMessage from "../components/taskmessage/TaskMessage";
import Add from "../components/taskmessage/Add";
import styles from "../assets/css/component.css";
import {Route} from "react-router-dom";
import Edit from "../components/building/Edit";

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
        this.props.history.push('/tasks/' + messageNo)
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
        // add api call here
        const updated = [...this.state.taskMessages];
        updated.push(taskMessage);
        this.setState({taskMessages: updated});
    };

    removeFromTaskMessages = (id) => {
        // query.access_token = JSON.parse(localStorage.getItem('user')).access_token;
        api.deleteTaskMessage(id).then(result => {
                const taskMessages = [...this.state.taskMessages];
                delete taskMessages[id];
                const updated = taskMessages.filter(el => {
                    return el.id !== id;
                });
                this.setState({taskMessages: updated});
            }
        ).catch(e => {
            console.log(e);
        });
        console.log('Task message removed');
    };

    render() {
        let taskMessages = <p>There are no tasks messages currently available.</p>;
        if (!this.state.error) {
            taskMessages = this.state.taskMessages.map(t => {
                    return (
                        <div key={t.messageNo}>
                            <TaskMessage
                                key={t.messageNo}
                                messageNo={t.messageNo}
                                text={t.messageText}
                                clicked={() => this.taskMessageSelectedHandler(t.messageNo)}
                                removeTaskMessage={() => this.removeFromTaskMessages}/>
                        </div>
                    )
                }
            );
        }

        return (
            <div className={styles.component}>
                <h1>Tasks Messages</h1>
                {taskMessages}
                <Add addToTaskMessages={this.addToTaskMessages}/>
                <Route path={this.props.match.url + '/:no'} exact component={Edit}/>
            </div>
        );
    }
}

export default TaskMessages;