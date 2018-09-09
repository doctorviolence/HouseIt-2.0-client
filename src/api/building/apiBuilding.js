import axios from '../axios-instance';

class ApiBuilding {

    getBuilding = (id, queryToken) => {
        console.log('[ApiBuilding]: ', id);
        return axios.get('/buildings/find-by-id/' + id, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': queryToken
            }
        })
            .then(response => response.data);
    };

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
            .then(response => response.data);
    };

    uploadFile = (file, name, queryToken) => {
        const formData = new FormData();
        formData.append('file', file, name);
        return axios
            .post('/buildings/upload-image', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    'Authorization': queryToken
                }
            })
            .then(response => response.data);
    };

    editBuilding = (data, queryToken) => {
        return axios
            .put('/buildings/update-building', data, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': queryToken
                }
            })
            .then(response => response.data);
    };

    deleteBuilding = (id, queryToken) => {
        return axios
            .delete('/buildings/delete-building/' + id, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': queryToken
                }
            })
            .then(response => response.data);
    };
}

const apiBuilding = new ApiBuilding();
export default apiBuilding;