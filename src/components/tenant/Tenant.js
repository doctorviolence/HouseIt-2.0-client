import React, {Component} from 'react';

import Edit from './/Edit';

class Tenant extends Component {
    render() {
        let tenants = this.props.tenants.map((t, i) => {
            return (
                <li key={i}>
                    <b>ID: </b>{t.id}
                    <b>First Name: </b>{t.firstName}
                    <b>Last name: </b>{t.lastName}
                    <b>Phone No.: </b>{t.phoneNo}
                    <Edit/>
                    <button onClick={() => this.props.removeTenant(i)}>Remove</button>
                </li>
            )
        });

        console.log(Object.prototype.toString.call(tenants));
        console.log(tenants);

        if (tenants.length !== 0) {
            return (
                <ul>
                    {tenants}
                </ul>
            )
        }
        else {
            return (
                <p>
                    There are no tenants currently available.
                </p>
            )
        }
    }
}

export default Tenant;