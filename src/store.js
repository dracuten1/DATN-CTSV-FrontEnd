import RootReducers from 'reduxs/reducers/index';
import thunkMiddleware from 'redux-thunk';
import { applyMiddleware, createStore } from 'redux';
import logger from 'redux-logger';
import * as actions from 'reduxs/reducers/Authentication/action';

const store = createStore(
    RootReducers,
    applyMiddleware(
        thunkMiddleware,
        logger
    )
);
store.dispatch(actions.authCheckState());

export default store;