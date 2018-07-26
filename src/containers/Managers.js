import React, {Component} from 'react';

import Manager from "../components/manager/Manager";
import styles from "../assets/css/components.css";
import Add from "../components/manager/Add";

class Managers extends Component {
    constructor() {
        super();

        this.addToManagers = this.addToManagers.bind(this);
        this.removeFromManagers = this.removeFromManagers.bind(this);

        this.state = {
            managers: []
        }
    }

    shouldComponentUpdate(nextProps) {
        return nextProps.managers !== this.state.managers;
    }

    componentDidMount() {
        this.getManagers();
    }

    getManagers = () => {
        // add api call here
        this.setState({managers: this.state.managers})
    };

    addToManagers = (manager) => {
        // add api call here
        const updated = [...this.state.managers];
        updated.push(manager);
        this.setState({managers: updated});
    };

    removeFromManagers = (id) => {
        // add api call here
        const managers = [...this.state.managers];
        delete managers[id];
        const updated = managers.filter(el => {
            return el.id !== id;
        });
        this.setState({managers: updated});
    };

    render() {
        return (
            <div>
                <h1>Managers</h1>
                <Manager className={styles.manager} managers={this.state.managers}
                      removeManager={this.removeFromManagers}/>
                <Add managers={this.state.managers} addToManagers={this.addToManagers}/>
            </div>
        );
    }
}

export default Managers;