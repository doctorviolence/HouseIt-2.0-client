const initialState = {
    data: {
        buildings: [],
        apartments: [],
        tenants: [],
        tasks: [],
        taskMessages: [],
        users: []
    }
};

const retrieveBuildings = (state, action) => {
    return {
        ...state,
        data: {
            ...state.data, buildings: [...action.buildings]
        }
    };
};

const addBuilding = (state, action) => {
    const updatedBuildings = state.data.buildings.concat(action.result);
    return {
        ...state,
        data: {...state.data, buildings: updatedBuildings}
    };
};

const removeBuilding = (state, action) => {
    const updatedBuildings = state.data.buildings.filter(result => result.buildingId !== action.buildingId);
    return {
        ...state,
        data: {...state.data, buildings: updatedBuildings}
    };
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case 'BUILDINGS_RETRIEVED_SUCCESS':
            return retrieveBuildings(state, action);
        case 'BUILDING_ADDED_SUCCESS':
            return addBuilding(state, action);
        case 'BUILDING_UPDATED_SUCCESS':
            return;
        case 'BUILDING_REMOVED_SUCCESS':
            return removeBuilding(state, action);
        default:
            return state;
    }
};

export default reducer;