import * as api from "../api/login/apiLogin";

export const viewPopup = (popup) => {
    return dispatch => {
        dispatch({type: 'VIEW_POPUP', title: popup.title});
    }
};

export const closePopup = () => {
    return dispatch => {
        dispatch({type: 'CLOSE_POPUP'});
    }
};

export const loginInit = () => {
    return dispatch => {
        dispatch({type: 'LOGIN_INIT'});
    }
};

export const login = (username, password) => {
    return dispatch => {
        dispatch(loginInit());
        return api.login(username, password).then(result => {
                const token = result.headers.authorization;
                localStorage.setItem('token', token);
                dispatch(loginSuccess(token))
            }
        ).catch(e => {
            if (e.response.status === 401) {
                dispatch(loginFail('Wrong username and/or password!'))
            }
            else {
                dispatch(loginFail('Unable to log in at this time. Please try again later.'))
            }
        });
    }
};

export const loginSuccess = (token) => {
    return dispatch => {
        dispatch({type: 'LOGIN_SUCCESS', token: token});
    }
};

export const loginFail = (error) => {
    return dispatch => {
        dispatch({type: 'LOGIN_FAIL', error: error});
    }
};

export const logout = () => {
    return dispatch => {
        localStorage.removeItem('token');
        dispatch({type: 'LOGOUT'});
    }
};

export const viewBuildings = (view) => {
    return dispatch => {
        dispatch({type: 'VIEW_BUILDINGS', view});
    }
};

export const viewApartments = (view) => {
    return dispatch => {
        dispatch({type: 'VIEW_APARTMENTS', view});
    }
};