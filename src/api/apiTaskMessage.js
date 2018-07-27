import axios from './axios-instance';

export const getTaskMessages = no => {
    return axios
        .post('/manager/messages-by-task' + no)
        .then(response => response.data)
        .catch(error => error.response);
};

export const addTaskMessage = taskMessage => {
    return axios
        .post('/manager/create-message', taskMessage)
        .then(response => response.data)
        .catch(error => error.response);
};

export const updateTaskMessage = taskMessage => {
    return axios
        .put('/manager/update-task', taskMessage)
        .then(response => response.data)
        .catch(error => error.response);
};

export const deleteTaskMessage = no=> {
    return axios
        .delete('/manager/delete-message/' + no)
        .then(response => response.data)
        .catch(error => error.response);
};