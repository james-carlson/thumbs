import { createStore, applyMiddleware, combineReducers } from 'redux'; 
import reduxPromiseMiddleware from 'redux-promise-middleware';
import thunk from 'redux-thunk';
import view_reducer from './view_reducer';
import backend_reducer from './backend_reducer';
import sockets_reducer from './sockets_reducer';

const reducer = combineReducers({
    views: view_reducer,
    data: backend_reducer,
    sockets: sockets_reducer
})

export default createStore(
    reducer,
    applyMiddleware(thunk, reduxPromiseMiddleware()) 
);