import React, {Component} from 'react';

import User from "../components/user/User";
import styles from "../assets/css/components.css";
import Add from "../components/user/Add";

class Users extends Component {
    constructor() {
        super();

        this.addToUsers = this.addToUsers.bind(this);
        this.removeFromUsers = this.removeFromUsers.bind(this);

        this.state = {
            users: []
        }
    }

    shouldComponentUpdate(nextProps) {
        return nextProps.users !== this.state.users;
    }

    componentDidMount() {
        this.getUsers();
    }

    getUsers = () => {
        // add api call here
        this.setState({users: this.state.users})
    };

    addToUsers = (user) => {
        // add api call here
        const updated = [...this.state.users];
        updated.push(user);
        this.setState({users: updated});
    };

    removeFromUsers = (id) => {
        // add api call here
        const users = [...this.state.users];
        delete users[id];
        const updated = users.filter(el => {
            return el.id !== id;
        });
        this.setState({users: updated});
    };

    render() {
        return (
            <div>
                <h1>Users</h1>
                <User className={styles.user} users={this.state.users}
                      removeUser={this.removeFromUsers}/>
                <Add users={this.state.users} addToUsers={this.addToUsers}/>
            </div>
        );
    }
}

export default Users;