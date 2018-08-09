import axios from './axios-instance';

export const getAllTasks = (queryToken) => {
    return axios
        .get('/tasks', {headers: {'Content-Type': 'application/json', 'Authorization': queryToken}})
        .then(response => response.data);
};

export const getTasksByTenant = id => {
    return axios
        .get('/tasks/tasks-by-tenant' + id)
        .then(response => response.data)
        .catch(error => error.response);
};

export const getTasksByType = type => {
    return axios
        .get('/tasks/tasks-by-type' + type)
        .then(response => response.data)
        .catch(error => error.response);
};

export const getTasksByFixDate = () => {
    return axios
        .get('/tasks/tasks-by-fix-date')
        .then(response => response.data)
        .catch(error => error.response);
};

export const addTask = (data, queryToken) => {
    return axios
        .post('/tasks/create-task', data, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': queryToken
            }
        })
        .then(response => response.data)
        .catch(error => error.response);
};

export const updateTask = (data, queryToken) => {
    return axios
        .put('/tasks/update-task', data, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': queryToken
            }
        })
        .then(response => response.data)
        .catch(error => error.response);
};

export const deleteTask = (id, queryToken) => {
    return axios
        .delete('/tasks/delete-task/' + id, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': queryToken
            }
        })
        .then(response => response.data)
        .catch(error => error.response);
};