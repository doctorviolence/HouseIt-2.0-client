import axios from '../axios-instance';

class ApiTenant {

    getTenant = (id, queryToken) => {
        return axios.get('/tenants/find-by-id/' + id, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': queryToken
            }
        })
            .then(response => response.data);
    };

    getTenantsInApartment = (id, queryToken) => {
        return axios.get('/tenants/' + id, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': queryToken
            }
        })
            .then(response => response.data);
    };

    addTenant = (data, queryToken) => {
        return axios
            .post('/tenants/create-tenant', data, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': queryToken
                }
            })
            .then(response => response.data);
    };

    updateTenant = (data, queryToken) => {
        return axios
            .put('/tenants/update-tenant/', data, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': queryToken
                }
            })
            .then(response => response.data);
    };

    deleteTenant = (id, queryToken) => {
        return axios
            .delete('/tenants/delete-tenant/' + id, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': queryToken
                }
            })
            .then(response => response.data);
    };
}

const apiTenant = new ApiTenant();
export default apiTenant;