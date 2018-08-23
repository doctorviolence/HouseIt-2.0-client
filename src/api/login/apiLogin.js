import axios from '../axios-instance';

export const login = (username, password) => {
    const data = {
        username: username,
        password: password
    };
    return axios.post('/auth/login', data);
};

// I need to add this to my REST endpoints
export const logout = () => {
    return axios
        .post('/login/logout');
};