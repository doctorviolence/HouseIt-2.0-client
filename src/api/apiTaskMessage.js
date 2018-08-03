import axios from './axios-instance';

export const getAllTaskMessages = (queryToken) => {
    return axios
        .get('/messages', {headers: {'Content-Type': 'application/json', 'Authorization': queryToken}})
        .then(response => response.data);
};

export const getTaskMessages = no => {
    return axios
        .get('/messages/' + no)
        .then(response => response.data);
};

export const addTaskMessage = taskMessage => {
    return axios
        .post('/messages/create-message', taskMessage)
        .then(response => response.data)
        .catch(error => error.response);
};

export const updateTaskMessage = taskMessage => {
    return axios
        .put('/messages/update-task', taskMessage)
        .then(response => response.data)
        .catch(error => error.response);
};

export const deleteTaskMessage = no=> {
    return axios
        .delete('/messages/delete-message/' + no)
        .then(response => response.data)
        .catch(error => error.response);
};