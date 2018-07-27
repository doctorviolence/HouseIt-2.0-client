import axios from './axios-instance';

export const addUser = user => {
    return axios
        .post('/admin/create-user', user)
        .then(response => response.data)
        .catch(error => error.response);
};

export const updateUser = user => {
    return axios
        .put('/admin/update-user', user)
        .then(response => response.data)
        .catch(error => error.response);
};

export const deleteUser = id => {
    return axios
        .delete('/admin/delete-user/' + id)
        .then(response => response.data)
        .catch(error => error.response);
};