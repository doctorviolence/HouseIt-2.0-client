import React, {Component} from 'react';

import Edit from './/Edit';

class Manager extends Component {
    render() {
        let managers = this.props.managers.map((m, i) => {
            return (
                <li key={i}>
                    <b>ID: </b>{m.id}
                    <Edit/>
                    <button onClick={() => this.props.removeManager(i)}>Remove</button>
                </li>
            )
        });

        console.log(Object.prototype.toString.call(managers));
        console.log(managers);

        if (managers.length !== 0) {
            return (
                <ul>
                    {managers}
                </ul>
            )
        }
        else {
            return (
                <p>
                    There are no managers currently available.
                </p>
            )
        }
    }
}

export default Manager;