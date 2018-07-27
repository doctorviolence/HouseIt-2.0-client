import React, {Component} from 'react';
import * as api from '../api/apiTaskMessage';

import TaskMessage from "../components/taskmessage/TaskMessage";
import Add from "../components/taskmessage/Add";

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
        this.getTaskMessages();
    }

    getTaskMessages = (no) => {
        // query.access_token = JSON.parse(localStorage.getItem('user')).access_token;
        api.getTaskMessages(no).then(result => {
            this.setState({taskMessages: result});
        })
            .catch(e => {
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
                    return <TaskMessage
                        key={t.id}
                        messageNo={t.messageNo}
                        text={t.text}
                        removeTaskMessage={() => this.removeFromTaskMessages}/>
                }
            );
        }

        return (
            <div>
                <section className="tasksMessages">
                    <h1>Tasks Messages</h1>
                    {taskMessages}
                </section>
                <Add addToTaskMessages={this.addToTaskMessages}/>
            </div>
        );
    }
}

export default TaskMessages;