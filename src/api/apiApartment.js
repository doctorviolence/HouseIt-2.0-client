import axios from './axios-instance';

export const getApartmentsInBuilding = id => {
    return axios
        .post('/admin/apartments-in-building', id)
        .then(response => response.data);
};

export const addApartment = apartment => {
    return axios
        .post('/admin/create-apartment', apartment)
        .then(response => response.data)
        .catch(error => error.response);
};

export const updateApartment = apartment => {
    return axios
        .put('/admin/update-apartment', apartment)
        .then(response => response.data)
        .catch(error => error.response);
};

export const deleteApartment = id => {
    return axios
        .delete('/admin/delete-apartment/' + id)
        .then(response => response.data)
        .catch(error => error.response);
};