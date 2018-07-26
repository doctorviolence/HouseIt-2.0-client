import React, {Component} from 'react';

import Tenant from "../components/tenant/Tenant";
import styles from "../assets/css/components.css";
import Add from "../components/tenant/Add";

class Tenants extends Component {
    constructor() {
        super();

        this.addToTenants = this.addToTenants.bind(this);
        this.removeFromTenants = this.removeFromTenants.bind(this);

        this.state = {
            tenants: []
        }
    }

    shouldComponentUpdate(nextProps) {
        return nextProps.tenants !== this.state.tenants;
    }

    componentDidMount() {
        this.getTenants();
    }

    getTenants = () => {
        // add api call here
        this.setState({tenants: this.state.tenants})
    };

    addToTenants = (tenant) => {
        // add api call here
        const updated = [...this.state.tenants];
        updated.push(tenant);
        this.setState({tenants: updated});
    };

    removeFromTenants = (id) => {
        // add api call here
        const tenants = [...this.state.tenants];
        delete tenants[id];
        const updated = tenants.filter(el => {
            return el.id !== id;
        });
        this.setState({tenants: updated});
    };

    render() {
        return (
            <div>
                <h1>Tenants</h1>
                <Tenant className={styles.tenant} tenants={this.state.tenants}
                        removeTenant={this.removeFromTenants}/>
                <Add tenants={this.state.tenants} addToTenants={this.addToTenants}/>
            </div>
        );
    }
}

export default Tenants;