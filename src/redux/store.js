 import {applyMiddleware, createStore} from 'redux';
import thunkMiddleware from 'redux-thunk';
import logger from 'redux-logger';
import rootReducer from './root-reducer';

const middlewares = [logger, thunkMiddleware];
const store = createStore(rootReducer, applyMiddleware(...middlewares));

export default store;