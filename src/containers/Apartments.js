import React, {Component} from 'react';

import Apartment from "../components/Apartment/Apartment";
import styles from "../assets/css/components.css";
import Add from "../components/apartment/Add";

class Apartments extends Component {
    constructor() {
        super();

        this.addToApartments = this.addToApartments.bind(this);
        this.removeFromApartments = this.removeFromApartments.bind(this);

        this.state = {
            apartments: []
        }
    }

    shouldComponentUpdate(nextProps) {
        return nextProps.apartments !== this.state.apartments;
    }

    componentDidMount() {
        this.getApartments();
    }

    getApartments = () => {
        // add api call here
        this.setState({apartments: this.state.apartments})
    };

    addToApartments = (apartment) => {
        // add api call here
        const updated = [...this.state.apartments];
        updated.push(apartment);
        this.setState({apartments: updated});
    };

    removeFromApartments = (id) => {
        // add api call here
        const apartments = [...this.state.apartments];
        delete apartments[id];
        const updated = apartments.filter(el => {
            return el.id !== id;
        });
        this.setState({apartments: updated});
    };

    render() {
        return (
            <div>
                <h1>Apartments</h1>
                <Apartment className={styles.apartment} apartments={this.state.apartments}
                           removeApartment={this.removeFromApartments}/>
                <Add apartments={this.state.apartments} addToApartments={this.addToApartments}/>
            </div>
        );
    }
}

export default Apartments;