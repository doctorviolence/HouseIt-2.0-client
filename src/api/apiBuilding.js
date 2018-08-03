import axios from './axios-instance';

export const getBuildings = (queryToken) => {
    return axios
        .get('/buildings', {headers: {'Content-Type': 'application/json', 'Authorization': queryToken}})
        .then(response => response.data);
};

export const addBuilding = (building, queryToken) => {
    return axios
        .post('/buildings/create-building', building, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': queryToken
            }
        })
        .then(response => response.data)
        .catch(error => error.response);
};

export const updateBuilding = (building, queryToken) => {
    return axios
        .put('/buildings/update-building', building, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': queryToken
            }
        })
        .then(response => response.data)
        .catch(error => error.response);
};

export const deleteBuilding = (id, queryToken) => {
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