import React from 'react';
import { render, hydrate } from 'react-dom';
import { AppContainer } from 'react-hot-loader';
import fastClick from 'fastclick';
import createBrowserHistory from 'history/createBrowserHistory';

import createStore from './createStore';
import createApp from './createApp';

fastClick.attach(document.body);

if (SERVICE_STATE.__DEV__) {
  const { whyDidYouUpdate } = require('why-did-you-update');

  whyDidYouUpdate(React);
}

let DOMRender = null;
let App = null;

if (window.__INIT_STATE__) {
  DOMRender = hydrate;
  console.log('server');
  App = createApp(createBrowserHistory(), createStore(window.__INIT_STATE__));
} else {
  DOMRender = render;
  console.log('client');
  App = createApp(createBrowserHistory(), createStore());
}

const reactRenderDom = Component => DOMRender(
  SERVICE_STATE.__DEV__ && SERVICE_STATE.__BUILD_TYPE__ === 'client' ? (
    <AppContainer>
      <Component />
    </AppContainer>
  ) : <Component />,
  document.getElementById('root'),
);

if (module.hot) {
  module.hot.accept('./createApp', () => { reactRenderDom(App) });
}

reactRenderDom(App);