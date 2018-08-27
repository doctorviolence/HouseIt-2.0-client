const initialState = {
    frame: 'Menu',
    showPopup: false,
    popupTitle: '',
    token: null,
    tenant: null,
    loginError: null
};

const loginInit = (state, action) => {
    return {
        ...state,
        loginError: null,
        loading: true
    }
};

const loginSuccess = (state, action) => {
    return {
        ...state,
        token: action.token,
        tenant: action.tenant,
        loginError: null,
        loading: false
    }
};

const loginFail = (state, action) => {
    return {
        ...state,
        loginError: action.error,
        loading: false
    }
};

const logout = (state, action) => {
    return {
        ...state,
        token: null,
        tenant: null
    };
};

const viewPopup = (state, action) => {
    return {
        ...state,
        showPopup: true,
        popupTitle: action.title
    };
};

const closePopup = (state) => {
    return {
        ...state,
        showPopup: false,
        popupTitle: ''
    };
};

const viewFrame = (state, action) => {
    return {
        ...state,
        frame: action.view
    };
};

const closeFrame = (state, action) => {
    return {
        ...state,
        frame: action.view
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
        case 'LOGOUT':
            return logout(state, action);
        case 'VIEW_FRAME':
            return viewFrame(state, action);
        case 'CLOSE_FRAME':
            return closeFrame(state, action);
        case 'VIEW_POPUP':
            return viewPopup(state, action);
        case 'CLOSE_POPUP':
            return closePopup(state);
        default:
            return state;
    }
};

export default reducer;