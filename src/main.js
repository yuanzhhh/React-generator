import React from 'react';
import { render, hydrate } from 'react-dom';
import { AppContainer } from 'react-hot-loader';
import fastClick from 'fastclick';

import App from './App';

fastClick.attach(document.body);

if (SERVICE_STATE.__DEV__) {
  const { whyDidYouUpdate } = require('why-did-you-update');

  whyDidYouUpdate(React);
}

let DOMRender = null;
let createApp = null;

if (SERVICE_STATE.__BUILD_TYPE__ === 'ssr') {
  DOMRender = hydrate;

  createApp = App(window.__INIT_STATE__);
} else if (SERVICE_STATE.__BUILD_TYPE__ === 'client') {
  DOMRender = render;
  
  createApp = App();
}

const reactRenderDom = Component => DOMRender(
  SERVICE_STATE.__DEV__ ? (
    <AppContainer>
      <Component />
    </AppContainer>
  ) : <Component />,
  document.getElementById('root'),
);

if (module.hot) {
  module.hot.accept('./App', () => { reactRenderDom(createApp) });
}

reactRenderDom(createApp);