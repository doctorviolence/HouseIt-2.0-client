import axios from '../axios-instance';

class ApiApartment {

    getAllApartments = (queryToken) => {
        return axios.get('/apartments', {headers: {'Content-Type': 'application/json', 'Authorization': queryToken}})
            .then(response => response.data);
    };

    getApartmentsInBuilding = id => {
        return axios
            .get('/apartments/apartment_list-in-building' + id)
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
            .then(response => response.data)
            .catch(error => error.response);
    };

    updateApartment = (data, queryToken) => {
        return axios
            .put('/apartments/update-apartment', data, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': queryToken
                }
            })
            .then(response => response.data)
            .catch(error => error.response);
    };

    deleteApartment = (id, queryToken) => {
        return axios
            .delete('/apartments/delete-apartment/' + id, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': queryToken
                }
            })
            .then(response => response.data)
            .catch(error => error.response);
    };
}

const apiApartment = new ApiApartment();
export default apiApartment;