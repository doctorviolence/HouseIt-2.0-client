import axios from '../axios-instance';

class ApiTask {

    getTask = (id, queryToken) => {
        return axios.get('/tasks/find-by-id/' + id, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': queryToken
            }
        })
            .then(response => response.data);
    };

    getTasks = (queryToken) => {
        return axios
            .get('/tasks', {headers: {'Content-Type': 'application/json', 'Authorization': queryToken}})
            .then(response => response.data);
    };

    getTasksByTenant = (id, queryToken) => {
        return axios
            .get('/tasks/tasks-by-tenant/' + id, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': queryToken
                }
            })
            .then(response => response.data);
    };

    addTask = (data, queryToken) => {
        return axios
            .post('/tasks/create-task', data, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': queryToken
                }
            })
            .then(response => response.data);
    };

    updateTask = (data, queryToken) => {
        return axios
            .put('/tasks/update-task', data, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': queryToken
                }
            })
            .then(response => response.data);
    };

    deleteTask = (id, queryToken) => {
        return axios
            .delete('/tasks/delete-task/' + id, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': queryToken
                }
            })
            .then(response => response.data);
    };
}

const apiTask = new ApiTask();
export default apiTask;