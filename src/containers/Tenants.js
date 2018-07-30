import React, {Component} from 'react';
import * as api from '../api/apiTenant';

import Tenant from "../components/tenant/Tenant";
import Add from "../components/tenant/Add";

class Tenants extends Component {
    constructor() {
        super();

        this.addToTenants = this.addToTenants.bind(this);
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
        this.getTenants();
    }

    getTenants = (id) => {
        api.getTenantsInApartment(id).then(result => {
            this.setState({tenants: result});
        })
            .catch(e => {
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
        // query.access_token = JSON.parse(localStorage.getItem('user')).access_token;
        api.deleteTenant(id).then(result => {
                const tenants = [...this.state.tenants];
                delete tenants[id];
                const updated = tenants.filter(el => {
                    return el.id !== id;
                });
                this.setState({tenants: updated});
            }
        ).catch(e => {
            console.log(e);
        });
        console.log('Tenant removed');
    };

    render() {
        let tenants = <p>There are no tenants currently available.</p>;
        if (!this.state.error) {
            tenants = this.state.tenants.map(t => {
                    return <Tenant
                        key={t.id}
                        id={t.id}
                        firstName={t.firstName}
                        lastName={t.lastName}
                        phoneNo={t.phoneNo}
                        removeTenant={() => this.removeFromTenants}/>
                }
            );
        }

        return (
            <div>
                <h1>Tenants</h1>
                <section className="tenants">
                    {tenants}
                </section>
                <Add addToTenants={this.addToTenants}/>
            </div>
        );
    }
}

export default Tenants;