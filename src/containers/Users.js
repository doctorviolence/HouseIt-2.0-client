import React, {Component} from 'react';
import * as api from '../api/apiUser';

import User from "../components/user/User";
import Add from "../components/user/Add";

class Users extends Component {
    constructor() {
        super();

        this.addToUsers = this.addToUsers.bind(this);
        this.removeFromUsers = this.removeFromUsers.bind(this);

        this.state = {
            users: [],
            error: false
        }
    }

    shouldComponentUpdate(nextProps) {
        return nextProps.users !== this.state.users;
    }

    componentDidMount() {
        this.getUsers();
    }

    /*getUsers = () => {
        api.getUsers().then(result => {
            this.setState({users: result});
        })
            .catch(e => {
                console.log('Error loading users:', e);
                this.setState({error: true});
            })
    };*/

    addToUsers = (user) => {
        const updated = [...this.state.users];
        updated.push(user);
        this.setState({users: updated});
        console.log('User added');
    };

    removeFromUsers = (id) => {
        // query.access_token = JSON.parse(localStorage.getItem('user')).access_token;
        api.deleteUser(id).then(result => {
                const users = [...this.state.users];
                delete users[id];
                const updated = users.filter(el => {
                    return el.id !== id;
                });
                this.setState({users: updated});
            }
        ).catch(e => {
            console.log(e);
        });
        console.log('Tenant removed');
    };

    render() {
        let users = <p>There are no users currently available.</p>;
        if (!this.state.error) {
            users = this.state.users.map(u => {
                    return <User
                        key={u.id}
                        id={u.id}
                        username={u.username}
                        password={u.password}
                        role={u.role}
                        removeUser={() => this.removeFromUsers}/>
                }
            );
        }

        return (
            <div>
                <section className="users">
                    <h1>Users</h1>
                    {users}
                </section>
                <Add addToUsers={this.addToUsers}/>
            </div>
        );
    }
}

export default Users;