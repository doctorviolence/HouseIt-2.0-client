import axios from './axios-instance';

export const getAllApartments = (queryToken) => {
    return axios.get('/apartments', {headers: {'Content-Type': 'application/json', 'Authorization': queryToken}})
        .then(response => response.data);
};

//export const getApartmentsInBuilding = id => {
//    return axios
//        .get('/apartments/apartments-in-building' + id)
//        .then(response => response.data);
//};

export const addApartment = (apartment, queryToken) => {
    return axios
        .post('/apartments/create-apartment', apartment, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': queryToken
            }
        })
        .then(response => response.data)
        .catch(error => error.response);
};

export const updateApartment = (apartment, queryToken) => {
    return axios
        .put('/apartments/update-apartment', apartment, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': queryToken
            }
        })
        .then(response => response.data)
        .catch(error => error.response);
};

export const deleteApartment = (id, queryToken) => {
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