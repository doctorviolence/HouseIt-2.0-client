import axios from '../axios-instance';

class ApiApartment {

    getApartment = (id, queryToken) => {
        return axios.get('/apartments/find-by-id/' + id, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': queryToken
            }
        })
            .then(response => response.data);
    };

    getApartmentsInBuilding = (id, queryToken) => {
        return axios.get('/apartments/apartments-in-building/' + id, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': queryToken
            }
        })
            .then(response => response.data);
    };

    addApartment = (data, queryToken) => {
        return axios
            .post('/apartments/create-apartment', data, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': queryToken
                }
            })
            .then(response => response.data);
    };

    updateApartment = (data, queryToken) => {
        return axios
            .put('/apartments/update-apartment', data, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': queryToken
                }
            })
            .then(response => response.data);
    };

    deleteApartment = (id, queryToken) => {
        return axios
            .delete('/apartments/delete-apartment/' + id, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': queryToken
                }
            })
            .then(response => response.data);
    };
}

const apiApartment = new ApiApartment();
export default apiApartment;