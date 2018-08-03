import axios from './axios-instance';

export const getManagers = (queryToken) => {
    return axios
        .get('/admin/managers', {headers: {'Content-Type': 'application/json', 'Authorization': queryToken}})
        .then(response => response.data);
};

export const addManager = manager => {
    return axios
        .post('/admin/create-manager', manager)
        .then(response => response.data)
        .catch(error => error.response);
};

export const updateManager = manager => {
    return axios
        .put('/admin/update-manager', manager)
        .then(response => response.data)
        .catch(error => error.response);
};

export const deleteManager = id => {
    return axios
        .delete('/admin/delete-manager/' + id)
        .then(response => response.data)
        .catch(error => error.response);
};