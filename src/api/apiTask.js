import axios from './axios-instance';

export const getAllTasks = () => {
    return axios
        .post('/manager/tasks')
        .then(response => response.data)
        .catch(error => error.response);
};

export const getTasksByTenant = id => {
    return axios
        .post('/manager/tasks-by-tenant', id)
        .then(response => response.data)
        .catch(error => error.response);
};

export const getTasksByType = type => {
    return axios
        .post('/manager/tasks-by-type', type)
        .then(response => response.data)
        .catch(error => error.response);
};

export const getTasksByFixDate = () => {
    return axios
        .post('/manager/tasks-by-fix-date')
        .then(response => response.data)
        .catch(error => error.response);
};

export const addTask = task => {
    return axios
        .post('/manager/create-task', task)
        .then(response => response.data)
        .catch(error => error.response);
};

export const updateTask = task => {
    return axios
        .put('/manager/update-task', task)
        .then(response => response.data)
        .catch(error => error.response);
};

export const deleteTask = id => {
    return axios
        .delete('/manager/delete-task/' + id)
        .then(response => response.data)
        .catch(error => error.response);
};