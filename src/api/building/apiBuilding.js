import axios from '../axios-instance';

class ApiBuilding {

    getBuildings = (queryToken) => {
        return axios
            .get('/buildings', {headers: {'Content-Type': 'application/json', 'Authorization': queryToken}})
            .then(response => response.data);
    };

    addBuilding = (data, queryToken) => {
        return axios
            .post('/buildings/create-building', data, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': queryToken
                }
            })
            .then(response => response.data)
            .catch(error => error.response);
    };

    editBuilding = (data, queryToken) => {
        return axios
            .put('/buildings/update-building', data, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': queryToken
                }
            })
            .then(response => response.data)
            .catch(error => error.response);
    };

    deleteBuilding = (id, queryToken) => {
        return axios
            .delete('/buildings/delete-building/' + id, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': queryToken
                }
            })
            .then(response => response.data)
            .catch(error => error.response);
    };
}

const apiBuilding = new ApiBuilding();
export default apiBuilding;