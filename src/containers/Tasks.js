import React, {Component} from 'react';
import * as api from '../api/apiTask';

import Task from "../components/task/Task";
import Add from "../components/task/Add";
import styles from "../assets/css/component.css";
import {Route} from "react-router-dom";
import Edit from "../components/building/Edit";

class Tasks extends Component {
    constructor() {
        super();

        this.addToTasks = this.addToTasks.bind(this);
        this.removeFromTasks = this.removeFromTasks.bind(this);

        this.state = {
            tasks: [],
            error: false
        }
    }

    shouldComponentUpdate(nextProps) {
        return nextProps.tasks !== this.state.tasks;
    }

    componentDidMount() {
        this.loadData();
    }

    taskSelectedHandler = (taskNo) => {
        this.props.history.push('/tasks/' + taskNo)
    };

    loadData = () => {
        const queryToken = localStorage.getItem('token');

        api.getAllTasks(queryToken).then(result => {
            this.setState({tasks: result});
        }).catch(e => {
            console.log('Error loading tasks:', e);
            this.setState({error: true});
        })
    };

    addToTasks = (task) => {
        const updated = [...this.state.tasks];
        updated.push(task);
        this.setState({tasks: updated});
        console.log('Task added');
    };

    removeFromTasks = (taskNo) => {
        const queryToken = localStorage.getItem('token');

        api.deleteTask(taskNo, queryToken).then(result => {
                if (result.status === 500 && result !== null) {
                    console.log(result.error);
                    return;
                }

                const tasks = [...this.state.tasks];
                const updated = tasks.filter(el => {
                    return el.taskNo !== taskNo;
                });
                this.setState({tasks: updated});
            }
        ).catch(e => {
            console.log(e);
        });
    };

    render() {
        let tasks = <p>There are no tasks currently available.</p>;
        if (!this.state.error) {
            tasks = this.state.tasks.map(t => {
                    return (
                        <div key={t.taskNo}>
                            <Task
                                key={t.taskNo}
                                taskNo={t.taskNo}
                                taskType={t.taskType}
                                taskStatus={t.taskStatus}
                                resolved={t.resolved}
                                taskDate={t.taskDate}
                                fixDate={t.fixDate}
                                clicked={() => this.taskSelectedHandler(t.taskNo)}
                                removeBuilding={() => this.removeFromTasks(t.taskNo)}/>
                        </div>
                    )
                }
            );
        }

        return (
            <div className={styles.component}>
                <h1>Tasks</h1>
                {tasks}
                <Add addToTasks={this.addToTasks}/>
                <Route path={this.props.match.url + '/:no'} exact component={Edit}/>
            </div>
        );
    }
}

export default Tasks;