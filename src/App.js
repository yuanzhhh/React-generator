import React from 'react';
import { Provider } from 'react-redux';
import Router from './router';
import createStore from './createStore';

const createApp = (store = createStore()) => () => (
     <Provider store={store}>
         <Router />
     </Provider>
);

export default createApp;