import apiBuilding from './building/apiBuilding';
import apiApartment from './apartment/apiApartment';
import apiTenant from './tenant/apiTenant';
import apiTask from './task/apiTask';
import apiTaskMessage from './taskMessage/apiTaskMessage';
import apiUser from './user/apiUser';

export const retrieveBuildings = () => {
    return dispatch => {
        const queryToken = localStorage.getItem('token');
        return apiBuilding.getBuildings(queryToken)
            .then(buildings => {
                    dispatch({type: 'BUILDINGS_RETRIEVED_SUCCESS', buildings})
                }
            ).catch(e => {
                if (e && e.response !== undefined) {
                    dispatch({type: 'SHOW_ERROR', error: e.response.data.message});
                } else {
                    dispatch({type: 'SHOW_ERROR', error: 'Failed to retrieve buildings...'})
                }
            })
    }
};

export const addBuilding = (building) => {
    return dispatch => {
        const queryToken = localStorage.getItem('token');
        return apiBuilding.addBuilding(building, queryToken)
            .then(result => {
                    dispatch({type: 'BUILDING_ADDED_SUCCESS', result});
                    dispatch(viewPopup({title: 'Building added...'}));
                }
            ).catch(e => {
                if (e && e.response !== undefined) {
                    dispatch({type: 'SHOW_ERROR', error: e.response.data.message});
                } else {
                    dispatch({type: 'SHOW_ERROR', error: 'Failed to add building...'})
                }
            })
    }
};

export const uploadBuildingFile = (name, file) => {
    return dispatch => {
        const queryToken = localStorage.getItem('token');
        return apiBuilding.uploadFile(file, name, queryToken)
            .then(result => {
                }
            ).catch(e => {
                console.log(e);
                dispatch(closePopup());
                dispatch({type: 'SHOW_ERROR', error: 'Failed to upload image...'})
            })
    }
};

export const editBuilding = (building, id) => {
    return dispatch => {
        const queryToken = localStorage.getItem('token');
        return apiBuilding.editBuilding(building, queryToken)
            .then(result => {
                    dispatch({type: 'BUILDING_UPDATED_SUCCESS', building, id});
                    dispatch(viewPopup({title: 'Building updated...'}));
                }
            ).catch(e => {
                if (e && e.response !== undefined) {
                    dispatch({type: 'SHOW_ERROR', error: e.response.data.message});
                } else {
                    dispatch({type: 'SHOW_ERROR', error: 'Failed to update building...'})
                }
            })
    }
};

export const removeBuilding = (id) => {
    return dispatch => {
        const queryToken = localStorage.getItem('token');
        return apiBuilding.deleteBuilding(id, queryToken)
            .then(result => {
                    dispatch({type: 'BUILDING_REMOVED_SUCCESS', buildingId: id});
                    dispatch(viewPopup({title: 'Building removed...'}));
                }
            ).catch(e => {
                if (e && e.response !== undefined) {
                    console.log(e.response);
                    dispatch({type: 'SHOW_ERROR', error: e.response.data.message});
                } else {
                    dispatch({type: 'SHOW_ERROR', error: 'Failed to remove building...'})
                }
            })
    }
};

export const retrieveApartmentsInBuilding = (id) => {
    return dispatch => {
        const queryToken = localStorage.getItem('token');
        return apiApartment.getApartmentsInBuilding(id, queryToken)
            .then(apartments => {
                    dispatch({type: 'APARTMENTS_RETRIEVED_SUCCESS', apartments})
                }
            ).catch(e => {
                if (e && e.response !== undefined) {
                    dispatch({type: 'SHOW_ERROR', error: e.response.data.message});
                } else {
                    dispatch({type: 'SHOW_ERROR', error: 'Failed to retrieve apartments...'})
                }
            })
    }
};

export const addApartment = (apartment) => {
    return dispatch => {
        const queryToken = localStorage.getItem('token');
        return apiApartment.addApartment(apartment, queryToken)
            .then(result => {
                    dispatch({type: 'APARTMENT_ADDED_SUCCESS', result});
                    dispatch(viewPopup({title: 'Apartment added...'}));
                }
            ).catch(e => {
                if (e && e.response !== undefined) {
                    dispatch({type: 'SHOW_ERROR', error: e.response.data.message});
                } else {
                    dispatch({type: 'SHOW_ERROR', error: 'Failed to add apartment...'})
                }
            })
    }
};

export const editApartment = (apartment, id) => {
    return dispatch => {
        const queryToken = localStorage.getItem('token');
        return apiApartment.updateApartment(apartment, queryToken)
            .then(result => {
                    dispatch({type: 'APARTMENT_UPDATED_SUCCESS', apartment, id});
                    dispatch(viewPopup({title: 'Apartment updated...'}));
                }
            ).catch(e => {
                if (e && e.response !== undefined) {
                    dispatch({type: 'SHOW_ERROR', error: e.response.data.message});
                } else {
                    dispatch({type: 'SHOW_ERROR', error: 'Failed to update apartment...'})
                }
            })
    }
};

export const removeApartment = (id) => {
    return dispatch => {
        const queryToken = localStorage.getItem('token');
        return apiApartment.deleteApartment(id, queryToken)
            .then(result => {
                    dispatch({type: 'APARTMENT_REMOVED_SUCCESS', apartmentId: id});
                    dispatch(viewPopup({title: 'Apartment removed...'}));
                }
            ).catch(e => {
                if (e && e.response !== undefined) {
                    dispatch({type: 'SHOW_ERROR', error: e.response.data.message});
                } else {
                    dispatch({type: 'SHOW_ERROR', error: 'Failed to remove apartment...'})
                }
            })
    }
};

export const retrieveTenants = (apartmentId) => {
    return dispatch => {
        const queryToken = localStorage.getItem('token');
        return apiTenant.getTenantsInApartment(apartmentId, queryToken)
            .then(tenants => {
                    dispatch({type: 'TENANTS_RETRIEVED_SUCCESS', tenants})
                }
            ).catch(e => {
                if (e && e.response !== undefined) {
                    dispatch({type: 'SHOW_ERROR', error: e.response.data.message});
                } else {
                    dispatch({type: 'SHOW_ERROR', error: 'Failed to retrieve tenants...'})
                }
            })
    }
};

export const addTenant = (tenant) => {
    return dispatch => {
        const queryToken = localStorage.getItem('token');
        return apiTenant.addTenant(tenant, queryToken)
            .then(result => {
                    dispatch({type: 'TENANT_ADDED_SUCCESS', result})
                    dispatch(viewPopup({title: 'Tenant added...'}))
                }
            ).catch(e => {
                if (e && e.response !== undefined) {
                    dispatch({type: 'SHOW_ERROR', error: e.response.data.message});
                } else {
                    dispatch({type: 'SHOW_ERROR', error: 'Failed to add tenant...'})
                }
            })
    }
};

export const editTenant = (tenant, id) => {
    return dispatch => {
        const queryToken = localStorage.getItem('token');
        return apiTenant.updateTenant(tenant, queryToken)
            .then(result => {
                    dispatch({type: 'TENANT_UPDATED_SUCCESS', tenant, id});
                    dispatch(viewPopup({title: 'Tenant updated...'}));
                }
            ).catch(e => {
                if (e && e.response !== undefined) {
                    dispatch({type: 'SHOW_ERROR', error: e.response.data.message});
                } else {
                    dispatch({type: 'SHOW_ERROR', error: 'Failed to update tenant...'})
                }
            })
    }
};

export const removeTenant = (id) => {
    return dispatch => {
        const queryToken = localStorage.getItem('token');
        return apiTenant.deleteTenant(id, queryToken)
            .then(result => {
                    dispatch({type: 'TENANT_REMOVED_SUCCESS', tenantId: id});
                    dispatch(viewPopup({title: 'Tenant removed...'}));
                }
            ).catch(e => {
                if (e && e.response !== undefined) {
                    dispatch({type: 'SHOW_ERROR', error: e.response.data.message});
                } else {
                    dispatch({type: 'SHOW_ERROR', error: 'Failed to remove tenant...'})
                }
            })
    }
};

export const retrieveTask = (id) => {
    return dispatch => {
        const queryToken = localStorage.getItem('token');
        return apiTask.getTask(id, queryToken)
            .then(task => {
                    dispatch({type: 'TASK_RETRIEVED_SUCCESS', task});
                }
            ).catch(e => {
                if (e && e.response !== undefined) {
                    dispatch({type: 'SHOW_ERROR', error: e.response.data.message});
                } else {
                    dispatch({type: 'SHOW_ERROR', error: 'Failed to retrieve task...'})
                }
            })
    }
};

export const retrieveTasks = () => {
    return dispatch => {
        const queryToken = localStorage.getItem('token');
        return apiTask.getTasks(queryToken)
            .then(tasks => {
                    dispatch({type: 'TASKS_RETRIEVED_SUCCESS', tasks});
                }
            ).catch(e => {
                if (e && e.response !== undefined) {
                    dispatch({type: 'SHOW_ERROR', error: e.response.data.message});
                } else {
                    dispatch({type: 'SHOW_ERROR', error: 'Failed to retrieve tasks...'})
                }
            })
    }
};

export const retrieveTasksByTenant = (id) => {
    return dispatch => {
        const queryToken = localStorage.getItem('token');
        return apiTask.getTasksByTenant(id, queryToken)
            .then(tasks => {
                    dispatch({type: 'TASKS_RETRIEVED_SUCCESS', tasks});
                }
            ).catch(e => {
                if (e && e.response !== undefined) {
                    dispatch({type: 'SHOW_ERROR', error: e.response.data.message});
                } else {
                    dispatch({type: 'SHOW_ERROR', error: 'Failed to retrieve tasks...'})
                }
            })
    }
};

export const addTask = (task) => {
    return dispatch => {
        const queryToken = localStorage.getItem('token');
        return apiTask.addTask(task, queryToken)
            .then(result => {
                    dispatch({type: 'TASK_ADDED_SUCCESS', result});
                    dispatch(viewPopup({title: 'Task added...'}));
                }
            ).catch(e => {
                if (e && e.response !== undefined) {
                    dispatch({type: 'SHOW_ERROR', error: e.response.data.message});
                } else {
                    dispatch({type: 'SHOW_ERROR', error: 'Failed to add task...'})
                }
            })
    }
};

export const editTask = (task, id) => {
    return dispatch => {
        const queryToken = localStorage.getItem('token');
        return apiTask.updateTask(task, queryToken)
            .then(result => {
                    dispatch({type: 'TASK_UPDATED_SUCCESS', task, id});
                    dispatch(viewPopup({title: 'Task updated...'}));
                }
            ).catch(e => {
                if (e && e.response !== undefined) {
                    dispatch({type: 'SHOW_ERROR', error: e.response.data.message});
                } else {
                    console.log(e);
                    dispatch({type: 'SHOW_ERROR', error: 'Failed to update task...'})
                }
            })
    }
};
export const removeTask = (id) => {
    return dispatch => {
        const queryToken = localStorage.getItem('token');
        return apiTask.deleteTask(id, queryToken)
            .then(result => {
                    dispatch({type: 'TASK_REMOVED_SUCCESS', taskNo: id});
                    dispatch(viewPopup({title: 'Task removed...'}));
                }
            ).catch(e => {
                if (e && e.response !== undefined) {
                    dispatch({type: 'SHOW_ERROR', error: e.response.data.message});
                } else {
                    dispatch({type: 'SHOW_ERROR', error: 'Failed to remove task...'})
                }
            })
    }
};

export const retrieveTaskMessages = (taskNo) => {
    return dispatch => {
        const queryToken = localStorage.getItem('token');
        return apiTaskMessage.getTaskMessages(taskNo, queryToken)
            .then(taskMessages => {
                    dispatch({type: 'MESSAGES_RETRIEVED_SUCCESS', taskMessages})
                }
            ).catch(e => {
                if (e && e.response !== undefined) {
                    dispatch({type: 'SHOW_ERROR', error: e.response.data.message});
                } else {
                    dispatch({type: 'SHOW_ERROR', error: 'Failed to retrieve messages...'})
                }
            })
    }
};

export const addTaskMessage = (taskMessage) => {
    return dispatch => {
        const queryToken = localStorage.getItem('token');
        return apiTaskMessage.addTaskMessage(taskMessage, queryToken)
            .then(result => {
                    dispatch({type: 'MESSAGE_ADDED_SUCCESS', taskMessage: result});
                    dispatch(viewPopup({title: 'Message added...'}));
                }
            ).catch(e => {
                if (e && e.response !== undefined) {
                    dispatch({type: 'SHOW_ERROR', error: e.response.data.message});
                } else {
                    dispatch({type: 'SHOW_ERROR', error: 'Failed to add message...'})
                }
            })
    }
};

export const editTaskMessage = (taskMessage, id) => {
    return dispatch => {
        const queryToken = localStorage.getItem('token');
        return apiTaskMessage.updateTaskMessage(taskMessage, queryToken)
            .then(result => {
                    dispatch({type: 'MESSAGE_UPDATED_SUCCESS', taskMessage, id});
                    dispatch(viewPopup({title: 'Message updated...'}));
                }
            ).catch(e => {
                if (e && e.response !== undefined) {
                    dispatch({type: 'SHOW_ERROR', error: e.response.data.message});
                } else {
                    dispatch({type: 'SHOW_ERROR', error: 'Failed to update message...'})
                }
            })
    }
};

export const removeTaskMessage = (id) => {
    return dispatch => {
        const queryToken = localStorage.getItem('token');
        return apiTaskMessage.deleteTaskMessage(id, queryToken)
            .then(result => {
                    dispatch({type: 'MESSAGE_REMOVED_SUCCESS', messageNo: id});
                    dispatch(viewPopup({title: 'Message removed...'}));
                }
            ).catch(e => {
                if (e && e.response !== undefined) {
                    dispatch({type: 'SHOW_ERROR', error: e.response.data.message});
                } else {
                    dispatch({type: 'SHOW_ERROR', error: 'Failed to remove message...'})
                }
            })
    }
};

export const addUser = (user) => {
    return dispatch => {
        const queryToken = localStorage.getItem('token');
        return apiUser.addUser(user, queryToken)
            .then(result => {
                    dispatch(viewPopup({title: 'User added...'}))
                }
            ).catch(e => {
                if (e && e.response !== undefined) {
                    dispatch({type: 'SHOW_ERROR', error: e.response.data.message});
                } else {
                    dispatch({type: 'SHOW_ERROR', error: 'Failed to add user...'})
                }
            })
    }
};

export const updateUserPassword = (passwords) => {
    return dispatch => {
        const queryToken = localStorage.getItem('token');
        return apiUser.updatePassword(passwords, queryToken)
            .then(result => {
                    dispatch(viewPopup({title: 'Password updated...'}))
                }
            ).catch(e => {
                if (e && e.response !== undefined) {
                    dispatch({type: 'SHOW_ERROR', error: e.response.data});
                } else {
                    dispatch({type: 'SHOW_ERROR', error: 'Failed to update password...'})
                }
            })
    }
};

export const closeError = () => ({type: 'CLOSE_ERROR'});
export const viewPopup = (popup) => ({type: 'VIEW_POPUP', title: popup.title});
export const closePopup = () => ({type: 'CLOSE_POPUP'});