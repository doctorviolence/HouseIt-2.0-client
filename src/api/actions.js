import apiBuilding from './building/apiBuilding';

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

export const removeBuilding = (id) => {
    return dispatch => {
        const queryToken = localStorage.getItem('token');

        return apiBuilding.deleteBuilding(id, queryToken)
            .then(result => {
                    dispatch({type: 'BUILDING_REMOVED_SUCCESS', buildingId: id})
                }
            ).catch(e => {
                console.log('Error deleting buildings:', e);
            })
    }
};