import React from 'react';
import {
  BrowserRouter,
  Router,
  Route,
  Link,
} from 'react-router-dom';

import routers from './routers';

const Routers: React.ComponentClass<any> = SERVICE_STATE.__BUILD_TYPE__ === 'ssr' ? Router : BrowserRouter;

export default (props) => (
  <Routers {...props}>
    <div>
      <ul>
        <li><Link to="/">index</Link></li>
        <li><Link to="/DishMenu">DishMenu</Link></li>
      </ul>
      {
        routers.map((item) => (
          <Route {...item as any} />
        ))
      }
    </div>
  </Routers>
);
