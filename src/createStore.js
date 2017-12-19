
import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import createSagaMiddleware from 'redux-saga';

import utils from './utils';
import reducers from './reducers'
import { helloSaga } from './sagas';

export default (state = {}) => {

    const composeList = [
        applyMiddleware(createSagaMiddleware(helloSaga)),
    ];

    if (SERVICE_STATE.__DEV__ && SERVICE_STATE.__BUILD_PATH__ !== 'node' && utils.objectGet(window, '__REDUX_DEVTOOLS_EXTENSION__')) {
        composeList.push(window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__())
    };

    const enhancer = compose(...composeList);

    return createStore(
        combineReducers(reducers),
        state,
        enhancer,
    );
}