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

const editBuilding = (state, action) => {
    const updatedBuildings = state.data.buildings.map(b => {
        if (b.buildingId === action.id) {
            return {...b, ...action.building}
        }
        return b
    });
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

const retrieveApartments = (state, action) => {
    return {
        ...state,
        data: {
            ...state.data, apartments: [...action.apartments]
        }
    };
};

const addApartment = (state, action) => {
    const updatedApartments = state.data.apartments.concat(action.result);
    return {
        ...state,
        data: {...state.data, apartments: updatedApartments}
    };
};

const editApartment = (state, action) => {
    const updatedApartments = state.data.apartments.map(a => {
        if (a.apartmentId === action.id) {
            return {...a, ...action.apartment}
        }
        return a
    });
    return {
        ...state,
        data: {...state.data, apartments: updatedApartments}
    };
};

const removeApartment = (state, action) => {
    const updatedApartments = state.data.apartments.filter(result => result.apartmentId !== action.apartmentId);
    return {
        ...state,
        data: {...state.data, apartments: updatedApartments}
    };
};

const retrieveTenants = (state, action) => {
    return {
        ...state,
        data: {
            ...state.data, tenants: [...action.tenants]
        }
    };
};

const addTenant = (state, action) => {
    const updatedTenants = state.data.tenants.concat(action.result);
    return {
        ...state,
        data: {...state.data, tenants: updatedTenants}
    };
};

const editTenant = (state, action) => {
    const updatedTenants = state.data.tenants.map(t => {
        if (t.tenantId === action.id) {
            return {...t, ...action.tenant}
        }
        return t
    });
    return {
        ...state,
        data: {...state.data, tenants: updatedTenants}
    };
};

const removeTenant = (state, action) => {
    const updatedTenants = state.data.tenants.filter(result => result.tenantId !== action.tenantId);
    return {
        ...state,
        data: {...state.data, tenants: updatedTenants}
    };
};

const retrieveTasks = (state, action) => {
    return {
        ...state,
        data: {
            ...state.data, tasks: [...action.tasks]
        }
    };
};

const addTask = (state, action) => {
    const updatedTasks = state.data.tasks.concat(action.result);
    return {
        ...state,
        data: {...state.data, tasks: updatedTasks}
    };
};

const editTask = (state, action) => {
    const updatedTasks = state.data.tasks.map(t => {
        if (t.taskNo === action.id) {
            return {...t, ...action.task}
        }
        return t
    });
    return {
        ...state,
        data: {...state.data, tasks: updatedTasks}
    };
};

const removeTask = (state, action) => {
    const updatedTasks = state.data.tasks.filter(result => result.taskNo !== action.taskNo);
    return {
        ...state,
        data: {...state.data, tasks: updatedTasks}
    };
};

const retrieveMessages = (state, action) => {
    return {
        ...state,
        data: {
            ...state.data, taskMessages: [...action.taskMessages]
        }
    };
};

const addMessage = (state, action) => {
    const updatedMessages = state.data.taskMessages.concat(action.taskMessage);
    return {
        ...state,
        data: {...state.data, taskMessages: updatedMessages}
    };
};

const editMessage = (state, action) => {
    const updatedMessages = state.data.taskMessages.map(m => {
        if (m.messageNo === action.id) {
            return {...m, ...action.taskMessage}
        }
        return m
    });
    return {
        ...state,
        data: {...state.data, taskMessages: updatedMessages}
    };
};

const removeMessage = (state, action) => {
    const updatedMessages = state.data.taskMessages.filter(result => result.messageNo !== action.messageNo);
    return {
        ...state,
        data: {...state.data, taskMessages: updatedMessages}
    };
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case 'BUILDINGS_RETRIEVED_SUCCESS': return retrieveBuildings(state, action);
        case 'BUILDING_ADDED_SUCCESS': return addBuilding(state, action);
        case 'BUILDING_UPDATED_SUCCESS': return editBuilding(state, action);
        case 'BUILDING_REMOVED_SUCCESS': return removeBuilding(state, action);
        case 'APARTMENTS_RETRIEVED_SUCCESS': return retrieveApartments(state, action);
        case 'APARTMENT_ADDED_SUCCESS': return addApartment(state, action);
        case 'APARTMENT_UPDATED_SUCCESS': return editApartment(state, action);
        case 'APARTMENT_REMOVED_SUCCESS': return removeApartment(state, action);
        case 'TENANTS_RETRIEVED_SUCCESS': return retrieveTenants(state, action);
        case 'TENANT_ADDED_SUCCESS': return addTenant(state, action);
        case 'TENANT_UPDATED_SUCCESS': return editTenant(state, action);
        case 'TENANT_REMOVED_SUCCESS': return removeTenant(state, action);
        case 'TASKS_RETRIEVED_SUCCESS': return retrieveTasks(state, action);
        case 'TASK_ADDED_SUCCESS': return addTask(state, action);
        case 'TASK_UPDATED_SUCCESS': return editTask(state, action);
        case 'TASK_REMOVED_SUCCESS': return removeTask(state, action);
        case 'MESSAGES_RETRIEVED_SUCCESS': return retrieveMessages(state, action);
        case 'MESSAGE_ADDED_SUCCESS': return addMessage(state, action);
        case 'MESSAGE_UPDATED_SUCCESS': return editMessage(state, action);
        case 'MESSAGE_REMOVED_SUCCESS': return removeMessage(state, action);
        default: return state;
    }
};

export default reducer;