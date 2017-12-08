
import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import createSagaMiddleware from 'redux-saga';

import reducers from './reducers'
import { helloSaga } from './sagas';

export default (state = {}) => {

    const composeList = [
        applyMiddleware(createSagaMiddleware(helloSaga)),
    ];
    
    if (SERVICE_STATE.__DEV__) {
        composeList.push(require('./DevTools').instrument())
    };

    const enhancer = compose(...composeList);

    createStore(
        combineReducers(reducers),
        state,
        enhancer,
    );
}