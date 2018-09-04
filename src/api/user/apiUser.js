import axios from '../axios-instance';

class ApiUser {

    addUser = (data, queryToken) => {
        return axios
            .post('/users/create-user', data, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': queryToken
                }
            })
            .then(response => response.data);
    };

    updateUser = (data, queryToken) => {
        return axios
            .put('/users/update-user/', data, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': queryToken
                }
            })
            .then(response => response.data);
    };
}

const apiUser = new ApiUser();
export default apiUser;