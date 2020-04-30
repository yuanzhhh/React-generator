import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Link,
} from 'react-router-dom';

import routers from './routers';

export default _props => (
  <Router>
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
  </Router>
);
