import React from 'react';
import { render, hydrate } from 'react-dom';
import { AppContainer } from 'react-hot-loader';
import fastClick from 'fastclick';
import createBrowserHistory from 'history/createBrowserHistory';
import Loadable from 'react-loadable';

import createStore from './createStore';
import createApp from './createApp';

// 移除click 30ms延迟
fastClick.attach(document.body);

if ((window as any).SERVICE_STATE.__DEV__) {
  // 功能少
  // new (require('vconsole'));

  // 功能多
  require('eruda').init();

  const { whyDidYouUpdate } = require('why-did-you-update');

  whyDidYouUpdate(React);
}

let DOMRender: any;
let App: any;

if ((window as any).__INIT_STATE__) {
  DOMRender = hydrate;

  App = createApp(createBrowserHistory(), createStore((window as any).__INIT_STATE__));
} else {
  DOMRender = render;

  App = createApp(createBrowserHistory(), createStore());
}

const renderComponent = Component => (window as any).SERVICE_STATE.__DEV__ && (window as any).SERVICE_STATE.__BUILD_TYPE__ === 'client' ? (
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

if (((window as any).SERVICE_STATE).__BUILD_TYPE__ === 'ssr') {
  (window as any).main = () => reactRenderDom(App);
} else {
  reactRenderDom(App);
}
