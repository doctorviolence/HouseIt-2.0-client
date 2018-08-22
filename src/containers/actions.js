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