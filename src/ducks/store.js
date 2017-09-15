import { createStore, applyMiddleware, combineReducers } from 'redux'; 
import reduxPromiseMiddleware from 'redux-promise-middleware';
import view_reducer from './view_reducer';
import backend_reducer from './backend_reducer';

const reducer = combineReducers({
    views: view_reducer,
    data: backend_reducer
})

export default createStore(
    reducer,
    applyMiddleware(reduxPromiseMiddleware()) 
);