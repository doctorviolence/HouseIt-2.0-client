import axios from './axios-instance';

export const getBuildings = () => {
    return axios
        .post('/admin/buildings')
        .then(response => response.data);
};

export const addBuilding = building => {
    return axios
        .post('/admin/create-building', building)
        .then(response => response.data)
        .catch(error => error.response);
};

export const updateBuilding = building => {
    return axios
        .put('/admin/update-building', building)
        .then(response => response.data)
        .catch(error => error.response);
};

export const deleteBuilding = id => {
    return axios
        .delete('/admin/delete-building/' + id)
        .then(response => response.data)
        .catch(error => error.response);
};