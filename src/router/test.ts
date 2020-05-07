import {
  BrowserRouter,
  StaticRouter,
} from 'react-router-dom';

export default SERVICE_STATE.__BUILD_TYPE__ === 'ssr' ? StaticRouter : BrowserRouter;
