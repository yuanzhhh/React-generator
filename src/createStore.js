
import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';

import reducers from './reducers';

export default (state = {}) => {
    const composeList = [
        applyMiddleware(thunk),
    ];

    if (SERVICE_STATE.__DEV__ && typeof window !== 'undefined' && window.__REDUX_DEVTOOLS_EXTENSION__) {
        composeList.push(window.__REDUX_DEVTOOLS_EXTENSION__());
    };

    const enhancer = compose(...composeList);

    return createStore(
        combineReducers(reducers),
        state,
        enhancer,
    );
}