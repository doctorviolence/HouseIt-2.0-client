import React, {Component} from 'react';
import {Route} from "react-router-dom";
import * as api from '../api/apiTenant';

import Tenant from "../components/tenant/Tenant";
import Add from "../components/tenant/Add";
import Edit from "../components/tenant/Edit";
import styles from "../assets/css/component.css";

class Tenants extends Component {
    constructor() {
        super();

        this.addToTenants = this.addToTenants.bind(this);
        this.tenantSelectedHandler = this.tenantSelectedHandler.bind(this);
        this.removeFromTenants = this.removeFromTenants.bind(this);

        this.state = {
            tenants: [],
            error: false
        }
    }

    shouldComponentUpdate(nextProps) {
        return nextProps.tenants !== this.state.tenants;
    }

    componentDidMount() {
        this.loadData();
    }

    tenantSelectedHandler = (id) => {
        this.props.history.push('/tenants/' + id)
    };

    loadData = () => {
        const queryToken = localStorage.getItem('token');

        api.getAllTenants(queryToken).then(result => {
            this.setState({tenants: result});
        }).catch(e => {
            console.log('Error loading tenants:', e);
            this.setState({error: true});
        })
    };

    addToTenants = (tenant) => {
        const updated = [...this.state.tenants];
        updated.push(tenant);
        this.setState({tenants: updated});
        console.log('Tenant added');
    };

    removeFromTenants = (id) => {
        const queryToken = localStorage.getItem('token');

        api.deleteTenant(id, queryToken).then(result => {
                if (result.status === 500 && result !== null) {
                    console.log(result.error);
                    return;
                }

                const tenants = [...this.state.tenants];
                delete tenants[id];
                const updated = tenants.filter(el => {
                    return el.tenantId !== id;
                });
                this.setState({tenants: updated});
            }
        ).catch(e => {
            console.log(e);
        });
    };

    render() {
        let tenants = <p>There are no tenants currently available.</p>;
        if (!this.state.error) {
            tenants = this.state.tenants.map(t => {
                    return (
                        <div key={t.tenantId}>
                            <Tenant
                                key={t.tenantId}
                                id={t.tenantId}
                                firstName={t.firstName}
                                lastName={t.lastName}
                                phoneNo={t.phoneNo}
                                clicked={() => this.tenantSelectedHandler(t.tenantId)}
                                removeTenant={() => this.removeFromTenants}/>
                        </div>
                    )
                }
            );
        }

        return (
            <div className={styles.component}>
                <h1>Tenants</h1>
                {tenants}
                <Add addToTenants={this.addToTenants}/>
                <Route path={this.props.match.url + '/:id'} exact component={Edit}/>

            </div>
        );
    }
}

export default Tenants;