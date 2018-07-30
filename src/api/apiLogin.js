import axios from './axios-instance';

export const login = () => {
    return axios
        .post('/login')
        .then(response => response.data);
};

// I need to add this to my REST endpoints
export const logout = () => {
    return axios
        .post('/auth/logout')
        .then(response => response.data);
};