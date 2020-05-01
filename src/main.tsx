import React from 'react';
import { render, hydrate } from 'react-dom';
import { AppContainer } from 'react-hot-loader';
import fastClick from 'fastclick';
import { createBrowserHistory } from 'history';
import Loadable from 'react-loadable';

import createStore from './createStore';
import createApp from './createApp';

// 移除click 30ms延迟
fastClick.attach(document.body);

const serviceState = SERVICE_STATE;
const initState = (window as any).__INIT_STATE__;

if (serviceState.__DEV__) {
  // 功能少
  // new (require('vconsole'));

  // 功能多
  require('eruda').init();

  const { whyDidYouUpdate } = require('why-did-you-update');

  whyDidYouUpdate(React);
}

let DOMRender: any;
let App: any;

if (initState) {
  DOMRender = hydrate;

  App = createApp(createBrowserHistory(), createStore(initState));
} else {
  DOMRender = render;

  App = createApp(createBrowserHistory(), createStore());
}

const renderComponent = Component => serviceState.__DEV__ && serviceState.__BUILD_TYPE__ === 'client' ? (
  <AppContainer>
    <Component />
  </AppContainer>
) : <Component />

const reactRenderDom = Component => {
  Loadable.preloadReady().then(() => {
    DOMRender!(renderComponent(Component), document.getElementById('root'))
  });
};

if ((module as any).hot) {
  (module as any).hot.accept('./createApp', () => { reactRenderDom(App) });
}

if (serviceState.__BUILD_TYPE__ === 'ssr') {
  (window as any).main = () => reactRenderDom(App);
} else {
  reactRenderDom(App);
}
