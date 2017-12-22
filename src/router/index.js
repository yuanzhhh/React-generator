import React from 'react'
import {
  Router,
  Route,
  Link,
} from 'react-router-dom';

import routers from './routers';

const BasicRouter = props => (
  <Router history={props.history}>
    <div>
      <ul>
        <li><Link to="/">index</Link></li>
        <li><Link to="/DishMenu">DishMenu</Link></li>
      </ul>
      {
        routers.map((item, index) => (
          <Route key={index} {...item} />
        ))
      }
    </div>
  </Router>
)

export default BasicRouter;