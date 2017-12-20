import React from 'react';
import { Provider } from 'react-redux';
import Router from './router';


export default (history, store) => () => (
    <Provider store={store}>
        <Router history={history}/>
    </Provider>
);