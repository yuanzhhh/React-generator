import React from 'react';
import { Provider } from 'react-redux';
import Loadable from 'react-loadable';

import Router from './router';


export default (history, store, isSsr, modules) => () => (
    isSsr ? (
        <Provider store={store}>
            <Loadable.Capture report={moduleName => modules.push(moduleName)}>
                <Router history={history}/>
            </Loadable.Capture>
        </Provider>
    ) : (
        <Provider store={store}>
            <Router history={history}/>
        </Provider>
    )
);