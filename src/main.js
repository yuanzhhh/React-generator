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

if (SERVICE_STATE.__BUILD_TYPE__ === 'ssr') {
  DOMRender = hydrate;

  const store = createStore(window.__INIT_STATE__);

  App = createApp(createBrowserHistory(), store);
} else if (SERVICE_STATE.__BUILD_TYPE__ === 'client') {
  DOMRender = render;
  
  App = createApp(createBrowserHistory());
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