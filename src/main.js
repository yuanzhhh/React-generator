import React from 'react';
import { render } from 'react-dom';
import { AppContainer } from 'react-hot-loader';
import fastClick from 'fastclick'

import App from './components/test';

fastClick.attach(document.body);

if (SERVICE_STATE.__DEV__) {
  const { whyDidYouUpdate } = require('why-did-you-update')
  whyDidYouUpdate(React);
}


const renderDom = Component => render(
  SERVICE_STATE.__DEV__ ? (
    <AppContainer>
      <Component />
    </AppContainer>
  ) : <Component />,
  document.getElementById('root'),
)

if (SERVICE_STATE.__DEV__ && module.hot) {
  module.hot.accept('./components/test', () => { renderDom(App) })
}

renderDom(App);