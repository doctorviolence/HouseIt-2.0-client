import axios from './axios-instance';

export const getTenantsInApartment = id => {
    return axios
        .post('/manager/tenants-in-apartment', id)
        .then(response => response.data)
        .catch(error => error.response);
};

export const addTenant = tenant => {
    return axios
        .post('/manager/create-tenant', tenant)
        .then(response => response.data)
        .catch(error => error.response);
};

export const updateTenant = tenant => {
    return axios
        .put('/manager/update-tenant', tenant)
        .then(response => response.data)
        .catch(error => error.response);
};

export const deleteTenant = id => {
    return axios
        .delete('/manager/delete-tenant/' + id)
        .then(response => response.data)
        .catch(error => error.response);
};