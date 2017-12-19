import React from 'react';
import { Provider } from 'react-redux';
import Router from './router';
import createStore from './createStore';

export default (history, store = createStore()) => () => (
    <Provider store={store}>
        <Router history={history}/>
    </Provider>
);