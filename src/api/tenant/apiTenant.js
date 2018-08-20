import axios from '../axios-instance';

export const getAllTenants = (queryToken) => {
    return axios
        .get('/tenants', {headers: {'Content-Type': 'application/json', 'Authorization': queryToken}})
        .then(response => response.data);
};

//export const getTenantsInApartment = id => {
//    return axios
//        .get('/manager/tenants-in-apartment/' + id)
//        .then(response => response.data);
//};

export const addTenant = (data, queryToken) => {
    return axios
        .post('/tenants/create-tenant', data, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': queryToken
            }
        })
        .then(response => response.data)
        .catch(error => error.response);
};

export const updateTenant = (data, queryToken) => {
    return axios
        .put('/tenants/update-tenant', data, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': queryToken
            }
        })
        .then(response => response.data)
        .catch(error => error.response);
};

export const deleteTenant = (id, queryToken) => {
    return axios
        .delete('/tenants/delete-tenant/' + id, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': queryToken
            }
        })
        .then(response => response.data)
        .catch(error => error.response);
};