import React from 'react';
import { render } from 'react-dom';
import { AppContainer } from 'react-hot-loader';

import App from './components/test';

// 检测不必要的更新
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