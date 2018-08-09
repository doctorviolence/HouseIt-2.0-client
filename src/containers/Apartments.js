import React, {Component} from 'react';
import {Route} from "react-router-dom";
import * as api from '../api/apiApartment';

import Apartment from "../components/apartment/Apartment";
import Add from "../components/apartment/Add";
import styles from '../assets/css/component.css';
import Edit from "../components/apartment/Edit";

class Apartments extends Component {
    constructor() {
        super();

        this.addToApartments = this.addToApartments.bind(this);
        this.apartmentSelectedHandler = this.apartmentSelectedHandler.bind(this);
        this.removeFromApartments = this.removeFromApartments.bind(this);

        this.state = {
            apartments: [],
            error: false
        }
    }

    shouldComponentUpdate(nextProps) {
        return nextProps.apartments !== this.state.apartments;
    }

    componentDidMount() {
        this.loadData();
    }

    apartmentSelectedHandler = (id) => {
        this.props.history.push('/apartments/' + id)
    };

    loadData = () => {
        const queryToken = localStorage.getItem('token');

        api.getAllApartments(queryToken).then(result => {
            this.setState({apartments: result});
        }).catch(e => {
            console.log('Error loading apartments:', e);
            this.setState({error: true});
        })
    };

    addToApartments = (apartment) => {
        const updated = [...this.state.apartments];
        updated.push(apartment);
        this.setState({apartments: updated});
        console.log('Apartment added');
    };

    removeFromApartments = (id) => {
        const queryToken = localStorage.getItem('token');

        api.deleteApartment(id, queryToken).then(result => {
                if (result.status === 500 && result !== null) {
                    console.log(result.error);
                    return;
                }

                const apartments = [...this.state.apartments];
                const updated = apartments.filter(el => {
                    return el.apartmentId !== id;
                });
                this.setState({apartments: updated});
            }
        ).catch(e => {
            console.log(e);
        });
    };

    render() {
        let apartments = <p>There are no apartments currently available.</p>;
        if (!this.state.error) {
            apartments = this.state.apartments.map(a => {
                    return (
                        <div key={a.apartmentId}>
                            <Apartment
                                key={a.apartmentId}
                                id={a.apartmentId}
                                apartmentNo={a.apartmentNo}
                                size={a.size}
                                rent={a.rent}
                                floorNo={a.floorNo}
                                clicked={() => this.apartmentSelectedHandler(a.apartmentId)}
                                removeApartment={() => this.removeFromApartments(a.apartmentId)}/>
                        </div>
                    )
                }
            );
        }

        return (
            <div className={styles.component}>
                <h1>Apartments</h1>
                {apartments}
                <Add addToApartments={this.addToApartments}/>
                <Route path={this.props.match.url + '/:id'} exact component={Edit}/>
            </div>
        );
    }
}

export default Apartments;