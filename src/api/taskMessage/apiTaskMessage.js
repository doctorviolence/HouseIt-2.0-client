import axios from '../axios-instance';

class ApiTaskMessage {

    getMessage = (id, queryToken) => {
        return axios.get('/messages/find-by-id/' + id, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': queryToken
            }
        })
            .then(response => response.data);
    };

    getTaskMessages = (taskNo, queryToken) => {
        return axios
            .get('/messages/' + taskNo, {headers: {'Content-Type': 'application/json', 'Authorization': queryToken}})
            .then(response => response.data);
    };

    addTaskMessage = (data, queryToken) => {
        return axios
            .post('/messages/create-message', data, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': queryToken
                }
            })
            .then(response => response.data);
    };

    updateTaskMessage = (data, queryToken) => {
        return axios
            .put('/messages/update-message', data, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': queryToken
                }
            })
            .then(response => response.data);
    };

    deleteTaskMessage = (id, queryToken) => {
        return axios
            .delete('/messages/delete-message/' + id, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': queryToken
                }
            })
            .then(response => response.data);
    };
}

const apiTaskMessage = new ApiTaskMessage();
export default apiTaskMessage;