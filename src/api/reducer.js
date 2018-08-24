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
    const updatedTasks = state.data.tasks.map(b => {
        if (b.taskNo === action.id) {
            return {...b, ...action.task}
        }
        return b
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

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case 'BUILDINGS_RETRIEVED_SUCCESS':
            return retrieveBuildings(state, action);
        case 'BUILDING_ADDED_SUCCESS':
            return addBuilding(state, action);
        case 'BUILDING_UPDATED_SUCCESS':
            return editBuilding(state, action);
        case 'BUILDING_REMOVED_SUCCESS':
            return removeBuilding(state, action);
        case 'TASKS_RETRIEVED_SUCCESS':
            return retrieveTasks(state, action);
        case 'TASK_ADDED_SUCCESS':
            return addTask(state, action);
        case 'TASK_UPDATED_SUCCESS':
            return editTask(state, action);
        case 'TASK_REMOVED_SUCCESS':
            return removeTask(state, action);
        default:
            return state;
    }
};

export default reducer;