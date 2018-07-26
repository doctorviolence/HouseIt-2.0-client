import React, {Component} from 'react';

import Edit from './/Edit';

class User extends Component {
    render() {
        let users = this.props.users.map((u, i) => {
            return (
                <li key={i}>
                    <b>ID: </b>{u.id}
                    <b>Username: </b>{u.username}
                    <b>Password: </b>{u.password}
                    <b>Role: </b>{u.role}
                    <Edit/>
                    <button onClick={() => this.props.removeUser(i)}>Remove</button>
                </li>
            )
        });

        console.log(Object.prototype.toString.call(users));
        console.log(users);

        if (users.length !== 0) {
            return (
                <ul>
                    {users}
                </ul>
            )
        }
        else {
            return (
                <p>
                    There are no users currently available.
                </p>
            )
        }
    }
}

export default User;