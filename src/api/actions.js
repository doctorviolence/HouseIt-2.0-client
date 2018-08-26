import apiBuilding from './building/apiBuilding';
import apiApartment from './apartment/apiApartment';
import apiTenant from './tenant/apiTenant';
import apiTask from './task/apiTask';
import apiTaskMessage from './taskMessage/apiTaskMessage';

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

export const retrieveApartments = () => {
    return dispatch => {
        const queryToken = localStorage.getItem('token');
        return apiApartment.getAllApartments(queryToken)
            .then(apartments => {
                    dispatch({type: 'APARTMENTS_RETRIEVED_SUCCESS', apartments})
                }
            ).catch(e => {
                console.log('Error loading apartment_list:', e);
            })
    }
};

export const addApartment = (apartment) => {
    return dispatch => {
        const queryToken = localStorage.getItem('token');
        return apiApartment.addApartment(apartment, queryToken)
            .then(result => {
                    dispatch({type: 'APARTMENT_ADDED_SUCCESS', result})
                }
            ).catch(e => {
                console.log('Error adding apartment:', e);
            })
    }
};

export const editApartment = (apartment, id) => {
    return dispatch => {
        const queryToken = localStorage.getItem('token');
        return apiApartment.updateApartment(apartment, queryToken)
            .then(
                dispatch({type: 'APARTMENT_UPDATED_SUCCESS', apartment, id})
            ).catch(e => {
                console.log('Error updating apartment:', e);
            })
    }
};

export const removeApartment = (id) => {
    return dispatch => {
        const queryToken = localStorage.getItem('token');
        return apiApartment.deleteApartment(id, queryToken)
            .then(
                dispatch({type: 'APARTMENT_REMOVED_SUCCESS', apartmentId: id})
            ).catch(e => {
                console.log('Error deleting apartment:', e);
            })
    }
};

export const retrieveTenants = () => {
    return dispatch => {
        const queryToken = localStorage.getItem('token');
        return apiTenant.getAllTenants(queryToken)
            .then(tenants => {
                    dispatch({type: 'TENANTS_RETRIEVED_SUCCESS', tenants})
                }
            ).catch(e => {
                console.log('Error loading tenants:', e);
            })
    }
};

export const addTenant = (tenant) => {
    return dispatch => {
        const queryToken = localStorage.getItem('token');
        return apiTenant.addTenant(tenant, queryToken)
            .then(result => {
                    dispatch({type: 'TENANT_ADDED_SUCCESS', result})
                }
            ).catch(e => {
                console.log('Error adding tenant:', e);
            })
    }
};

export const editTenant = (tenant, id) => {
    return dispatch => {
        const queryToken = localStorage.getItem('token');
        return apiTenant.updateTenant(tenant, queryToken)
            .then(
                dispatch({type: 'TENANT_UPDATED_SUCCESS', tenant, id})
            ).catch(e => {
                console.log('Error updating tenant:', e);
            })
    }
};

export const removeTenant = (id) => {
    return dispatch => {
        const queryToken = localStorage.getItem('token');
        return apiTenant.deleteTenant(id, queryToken)
            .then(
                dispatch({type: 'TENANT_REMOVED_SUCCESS', id})
            ).catch(e => {
                console.log('Error deleting tenant:', e);
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

// Changing this later to get messages pertaining to task instead
export const retrieveTaskMessages = () => {
    return dispatch => {
        const queryToken = localStorage.getItem('token');
        return apiTaskMessage.getAllTaskMessages(queryToken)
            .then(taskMessages => {
                    dispatch({type: 'MESSAGES_RETRIEVED_SUCCESS', taskMessages})
                }
            ).catch(e => {
                console.log('Error loading messages:', e);
            })
    }
};

export const addTaskMessage = (taskMessage) => {
    return dispatch => {
        const queryToken = localStorage.getItem('token');
        return apiTaskMessage.addTaskMessage(taskMessage, queryToken)
            .then(taskMessage => {
                    dispatch({type: 'MESSAGE_ADDED_SUCCESS', taskMessage})
                }
            ).catch(e => {
                console.log('Error adding message:', e);
            })
    }
};

export const editTaskMessage = (taskMessage, id) => {
    return dispatch => {
        const queryToken = localStorage.getItem('token');
        return apiTaskMessage.updateTaskMessage(taskMessage, queryToken)
            .then(
                dispatch({type: 'MESSAGE_UPDATED_SUCCESS', taskMessage, id})
            ).catch(e => {
                console.log('Error updating message:', e);
            })
    }
};

export const removeTaskMessage = (id) => {
    return dispatch => {
        const queryToken = localStorage.getItem('token');
        return apiTaskMessage.deleteTaskMessage(id, queryToken)
            .then(
                dispatch({type: 'MESSAGE_REMOVED_SUCCESS', messageNo: id})
            ).catch(e => {
                console.log('Error deleting message:', e);
            })
    }
};