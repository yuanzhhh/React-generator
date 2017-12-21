import React from 'react'
import {
  Router,
  Route,
  Link,
} from 'react-router-dom';

import Test from '../components/test';
import DishMenu from '../views/dish-menu';

const BasicRouter = props => (
  <Router history={props.history}>
    <div>
      <ul>
        <li><Link to="/">index</Link></li>
        <li><Link to="/DishMenu">DishMenu</Link></li>
      </ul>
      <Route path="/" exact component={ Test } />
      <Route path="/DishMenu" component={ DishMenu } />
    </div>
  </Router>
)

export default BasicRouter;