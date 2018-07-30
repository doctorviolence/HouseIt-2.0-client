import React, {Component} from 'react';
import * as api from '../api/apiManager';

import Manager from "../components/manager/Manager";
import Add from "../components/manager/Add";

class Managers extends Component {
    constructor() {
        super();

        this.addToManagers = this.addToManagers.bind(this);
        this.removeFromManagers = this.removeFromManagers.bind(this);

        this.state = {
            managers: [],
            error: false
        }
    }

    shouldComponentUpdate(nextProps) {
        return nextProps.managers !== this.state.managers;
    }

    componentDidMount() {
        this.getManagers();
    }

    getManagers = () => {
        // query.access_token = JSON.parse(localStorage.getItem('user')).access_token;

        api.getManagers().then(result => {
            this.setState({managers: result});
        })
            .catch(e => {
                console.log('Error loading managers:', e);
                this.setState({error: true});
            })
    };

    addToManagers = (manager) => {
        const updated = [...this.state.managers];
        updated.push(manager);
        this.setState({managers: updated});
        console.log('Manager added');
    };

    removeFromManagers = (id) => {
        // query.access_token = JSON.parse(localStorage.getItem('user')).access_token;
        api.deleteManager(id).then(result => {
                const managers = [...this.state.managers];
                delete managers[id];
                const updated = managers.filter(el => {
                    return el.id !== id;
                });
                this.setState({managers: updated});
            }
        ).catch(e => {
            console.log(e);
        });
        console.log('Manager removed');
    };

    render() {
        let managers = <p>There are no managers currently available.</p>;
        if (!this.state.error) {
            managers = this.state.managers.map(m => {
                    return <Manager
                        key={m.id}
                        id={m.id}
                        removeManager={() => this.removeFromManagers}/>
                }
            );
        }

        return (
            <div>
                <h1>Managers</h1>
                <section className="managers">
                    {managers}
                </section>
                <Add addToManagers={this.addToManagers}/>
            </div>
        );
    }
}

export default Managers;