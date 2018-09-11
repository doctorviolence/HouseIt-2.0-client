const initialState = {
    frame: {title: 'Menu', props: null, newFrame: true},
    token: null,
    tenant: null,
    apartment: null,
    building: null,
    showLoginError: false,
    loginError: null
};

const loginInit = (state, action) => {
    return {
        ...state,
        loginError: null
    }
};

const loginSuccess = (state, action) => {
    return {
        ...state,
        token: action.token,
        tenant: action.tenant,
        apartment: action.apartment,
        building: action.building,
        loginError: null
    }
};

const loginFail = (state, action) => {
    return {
        ...state,
        showLoginError: true,
        loginError: action.error
    }
};

const logout = (state, action) => {
    return {
        ...state,
        token: null,
        tenant: null
    };
};

const viewFrame = (state, action) => {
    return {
        ...state,
        frame: {title: action.view, props: action.props, newFrame: true}
    };
};

const closeFrame = (state, action) => {
    return {
        ...state,
        frame: {title: action.view, props: action.props, newFrame: false}
    };
};

const closeLoginError = (state, action) => {
    return {
        ...state,
        loginError: null,
        showLoginError: false
    };
};


const reducer = (state = initialState, action) => {
    switch (action.type) {
        case 'LOGIN_INIT':
            return loginInit(state, action);
        case 'LOGIN_SUCCESS':
            return loginSuccess(state, action);
        case 'LOGIN_FAIL':
            return loginFail(state, action);
        case 'CLOSE_LOGIN_ERROR':
            return closeLoginError(state, action);
        case 'LOGOUT':
            return logout(state, action);
        case 'VIEW_FRAME':
            return viewFrame(state, action);
        case 'CLOSE_FRAME':
            return closeFrame(state, action);
        default:
            return state;
    }
};

export default reducer;