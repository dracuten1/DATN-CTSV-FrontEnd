import RootReducers from 'reduxs/reducers/index';
import thunkMiddleware from 'redux-thunk';
import { applyMiddleware, createStore } from 'redux';
import logger from 'redux-logger';
import * as actions from 'reduxs/reducers/Authentication/action';
import appConfig from 'config/app-config';

const middleware = [thunkMiddleware];
if (appConfig.appStage !== 'production') middleware.push(logger);
const store = createStore(
    RootReducers,
    applyMiddleware(
        ...middleware,
    )
);
store.dispatch(actions.authCheckState());

export default store;