import * as api from "../api/login/apiLogin";

export const loginInit = () => ({type: 'LOGIN_INIT'});

export const login = (username, password) => {
    return dispatch => {
        dispatch(loginInit());
        return api.login(username, password).then(result => {
                const token = result.headers.authorization;
                const tenant = result.headers.tenant;
                localStorage.setItem('token', token);
                dispatch(loginSuccess(token, tenant))
            }
        ).catch(e => {
            if (e && e.response !== undefined) {
                switch (e.response.status) {
                    case 401:
                        dispatch(loginFail('Wrong username and/or password!'));
                        break;
                    default:
                        dispatch(loginFail('Unable to log in at this time. Please try again later.'))
                }
            } else {
                dispatch(loginFail('Unable to log in at this time. Please try again later.'))
            }
        });
    }
};

export const loginSuccess = (token, tenant) => {
    return dispatch => {
        dispatch({type: 'LOGIN_SUCCESS', token: token, tenant: tenant});
        dispatch(tokenExpiration());
    }
};

export const loginFail = (error) => ({type: 'LOGIN_FAIL', error: error});

export const tokenExpiration = () => {
    return dispatch => {
        setTimeout(() => {
            dispatch(logout());
        }, 3600000);
    }
};

export const logout = () => {
    return dispatch => {
        localStorage.removeItem('token');
        dispatch({type: 'LOGOUT'});
    }
};

export const viewPopup = (popup) => ({type: 'VIEW_POPUP', title: popup.title});
export const closePopup = () => ({type: 'CLOSE_POPUP'});
export const viewFrame = (view) => ({type: 'VIEW_FRAME', view});
export const viewChildrenFrame = (view, parentId) => ({type: 'VIEW_CHILDREN_FRAME', view, parentId});
export const viewSubChildrenFrame = (view, subParentId) => ({type: 'VIEW_SUB_CHILDREN_FRAME', view, subParentId});
export const closeFrame = (view) => ({type: 'CLOSE_FRAME', view});
export const closeChildrenFrame = (view) => ({type: 'CLOSE_CHILDREN_FRAME', view});
export const closeSubChildrenFrame = (view) => ({type: 'CLOSE_SUB_CHILDREN_FRAME', view});
