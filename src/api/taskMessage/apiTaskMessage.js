import axios from '../axios-instance';

class ApiTaskMessage {

    getAllTaskMessages = (queryToken) => {
        return axios
            .get('/messages', {headers: {'Content-Type': 'application/json', 'Authorization': queryToken}})
            .then(response => response.data);
    };

    //getTaskMessages = no => {
    //    return axios
    //        .get('/messages/' + no)
    //        .then(response => response.data);
    //};

    addTaskMessage = (data, queryToken) => {
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

    updateTaskMessage = (data, queryToken) => {
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

    deleteTaskMessage = (id, queryToken) => {
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
}

const apiTaskMessage = new ApiTaskMessage();
export default apiTaskMessage;