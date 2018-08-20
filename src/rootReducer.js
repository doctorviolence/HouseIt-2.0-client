import {createStore, combineReducers, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import apiReducer from './api/reducer';

const rootReducer = combineReducers({
    apiState: apiReducer
});

const store = createStore(rootReducer, applyMiddleware(thunk));

export default store;