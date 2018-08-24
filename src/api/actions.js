import apiBuilding from './building/apiBuilding';
import apiTask from './task/apiTask';

export const retrieveBuildings = () => {
    return dispatch => {
        const queryToken = localStorage.getItem('token');
        return apiBuilding.getBuildings(queryToken)
            .then(buildings => {
                    dispatch({type: 'BUILDINGS_RETRIEVED_SUCCESS', buildings})
                }
            ).catch(e => {
                console.log('Error loading buildings:', e);
            })
    }
};

export const addBuilding = (building) => {
    return dispatch => {
        const queryToken = localStorage.getItem('token');
        return apiBuilding.addBuilding(building, queryToken)
            .then(result => {
                    dispatch({type: 'BUILDING_ADDED_SUCCESS', result})
                }
            ).catch(e => {
                console.log('Error adding building:', e);
            })
    }
};

export const editBuilding = (building, id) => {
    return dispatch => {
        const queryToken = localStorage.getItem('token');
        return apiBuilding.editBuilding(building, queryToken)
            .then(
                dispatch({type: 'BUILDING_UPDATED_SUCCESS', building, id})
            ).catch(e => {
                console.log('Error updating building:', e);
            })
    }
};

export const removeBuilding = (id) => {
    return dispatch => {
        const queryToken = localStorage.getItem('token');
        return apiBuilding.deleteBuilding(id, queryToken)
            .then(
                dispatch({type: 'BUILDING_REMOVED_SUCCESS', buildingId: id})
            ).catch(e => {
                console.log('Error deleting building_list:', e);
            })
    }
};

export const retrieveTasks = () => {
    return dispatch => {
        const queryToken = localStorage.getItem('token');
        return apiTask.getAllTasks(queryToken)
            .then(tasks => {
                    dispatch({type: 'TASKS_RETRIEVED_SUCCESS', tasks})
                }
            ).catch(e => {
                console.log('Error loading tasks:', e);
            })
    }
};

export const addTask = (task) => {
    return dispatch => {
        const queryToken = localStorage.getItem('token');
        return apiTask.addTask(task, queryToken)
            .then(result => {
                    dispatch({type: 'TASK_ADDED_SUCCESS', result})
                }
            ).catch(e => {
                console.log('Error adding task:', e);
            })
    }
};

export const editTask = (task, id) => {
    return dispatch => {
        const queryToken = localStorage.getItem('token');
        return apiTask.updateTask(task, queryToken)
            .then(
                dispatch({type: 'TASK_UPDATED_SUCCESS', task, id})
            ).catch(e => {
                console.log('Error updating task:', e);
            })
    }
};

export const removeTask = (id) => {
    return dispatch => {
        const queryToken = localStorage.getItem('token');
        return apiTask.deleteTask(id, queryToken)
            .then(
                dispatch({type: 'TASK_REMOVED_SUCCESS', taskNo: id})
            ).catch(e => {
                console.log('Error deleting task:', e);
            })
    }
};