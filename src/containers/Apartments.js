import React, {Component} from 'react';
import * as api from '../api/apiApartment';

import Apartment from "../components/apartment/Apartment";
import Add from "../components/apartment/Add";

class Apartments extends Component {
    constructor() {
        super();

        this.addToApartments = this.addToApartments.bind(this);
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
        this.getApartments();
    }

    getApartments = (id) => {
        // query.access_token = JSON.parse(localStorage.getItem('user')).access_token;

        api.getApartmentsInBuilding(id).then(result => {
            this.setState({apartments: result});
        })
            .catch(e => {
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
        // query.access_token = JSON.parse(localStorage.getItem('user')).access_token;
        api.deleteApartment(id).then(result => {
                const apartments = [...this.state.apartments];
                delete apartments[id];
                const updated = apartments.filter(el => {
                    return el.id !== id;
                });
                this.setState({apartments: updated});
            }
        ).catch(e => {
            console.log(e);
        });
        console.log('Apartment removed');
    };

    render() {
        let apartments = <p>There are no apartments currently available.</p>;
        if (!this.state.error) {
            apartments = this.state.apartments.map(a => {
                    return <Apartment
                        key={a.id}
                        id={a.id}
                        apartmentNo={a.apartmentNo}
                        size={a.size}
                        rent={a.rent}
                        floorNo={a.floorNo}
                        removeApartment={() => this.removeFromApartments}/>
                }
            );
        }

        return (
            <div>
                <h1>Apartments</h1>
                <section className="apartments">
                    {apartments}
                </section>
                <Add addToApartments={this.addToApartments}/>
            </div>
        );
    }
}

export default Apartments;