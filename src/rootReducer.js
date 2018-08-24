import {createStore, combineReducers, applyMiddleware, compose} from 'redux';
import thunk from 'redux-thunk';
import apiReducer from './api/reducer';
import containerReducer from './views/reducer';

const rootReducer = combineReducers({
    apiState: apiReducer,
    containerState: containerReducer
});

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(rootReducer, composeEnhancers(applyMiddleware(thunk)));

export default store;