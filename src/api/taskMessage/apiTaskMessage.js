import axios from '../axios-instance';

export const getAllTaskMessages = (queryToken) => {
    return axios
        .get('/messages', {headers: {'Content-Type': 'application/json', 'Authorization': queryToken}})
        .then(response => response.data);
};

//export const getTaskMessages = no => {
//    return axios
//        .get('/messages/' + no)
//        .then(response => response.data);
//};

export const addTaskMessage = (data, queryToken) => {
    return axios
        .post('/messages/create-message', data, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': queryToken
            }
        })
        .then(response => response.data)
        .catch(error => error.response);
};

export const updateTaskMessage = (data, queryToken) => {
    return axios
        .put('/messages/update-message', data, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': queryToken
            }
        })
        .then(response => response.data)
        .catch(error => error.response);
};

export const deleteTaskMessage = (id, queryToken) => {
    return axios
        .delete('/messages/delete-message/' + id, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': queryToken
            }
        })
        .then(response => response.data)
        .catch(error => error.response);
};