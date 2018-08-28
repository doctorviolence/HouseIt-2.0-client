import axios from '../axios-instance';

export const addUser = (user, queryToken) => {
    return axios
        .post('/users/create-user', user, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': queryToken
            }
        })
        .then(response => response.data);
};

export const updateUser = (user, queryToken) => {
    return axios
        .put('/users/update-user', user, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': queryToken
            }
        })
        .then(response => response.data);
};

export const deleteUser = (id, queryToken) => {
    return axios
        .delete('/users/delete-user/' + id, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': queryToken
            }
        })
        .then(response => response.data);
};