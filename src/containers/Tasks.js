import React, {Component} from 'react';
import * as api from '../api/apiTask';

import Task from "../components/task/Task";
import Add from "../components/task/Add";

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
        this.getTasks();
    }

    getTasks = () => {
        // query.access_token = JSON.parse(localStorage.getItem('user')).access_token;

        api.getAllTasks().then(result => {
            this.setState({tasks: result});
        })
            .catch(e => {
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

    removeFromTasks = (id) => {
        // query.access_token = JSON.parse(localStorage.getItem('user')).access_token;
        api.deleteTask(id).then(result => {
                const tasks = [...this.state.tasks];
                delete tasks[id];
                const updated = tasks.filter(el => {
                    return el.id !== id;
                });
                this.setState({tasks: updated});
            }
        ).catch(e => {
            console.log(e);
        });
        console.log('Task removed');
    };

    render() {
        let tasks = <p>There are no tasks currently available.</p>;
        if (!this.state.error) {
            tasks = this.state.tasks.map(t => {
                    return <Task
                        key={t.id}
                        taskNo={t.taskNo}
                        taskType={t.taskType}
                        taskStatus={t.taskStatus}
                        resolved={t.resolved}
                        taskDate={t.taskDate}
                        fixDate={t.fixDate}
                        removeTask={() => this.removeFromTasks}/>
                }
            );
        }

        return (
            <div>
                <h1>Tasks</h1>
                <section className="tasks">
                    {tasks}
                </section>
                <Add addToTasks={this.addToTasks}/>
            </div>
        );
    }
}

export default Tasks;