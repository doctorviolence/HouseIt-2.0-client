const initialState = {
    frame: [{title: 'Dashboard', props: {}}],
    showPopup: false,
    popupTitle: ''
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

const viewBuildings = (state, action) => {
    return {
        ...state,
        frame: {
            ...state.frame.concat(...action.view)
        }
    };
};

const viewApartments = (state, action) => {
    return {
        ...state,
        frame: {
            ...state.frame.concat(...action.view)
        }
    };
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case 'VIEW_BUILDINGS':
            return viewBuildings(state, action);
        case 'VIEW_APARTMENTS':
            return viewApartments(state, action);
        case 'VIEW_POPUP':
            return viewPopup(state, action);
        case 'CLOSE_POPUP':
            return closePopup(state);
        default:
            return state;
    }
};

export default reducer;