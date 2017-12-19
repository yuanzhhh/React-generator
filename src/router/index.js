import React from 'react'
import {
  Router,
  Route,
  Link,
} from 'react-router-dom';

import Test from '../components/test';
import Tests from '../components/tests';

const BasicRouter = props => (
  <Router history={props.history}>
    <div>
      <ul>
        <li><Link to="/">index</Link></li>
        <li><Link to="/tests">tests</Link></li>
      </ul>
      <Route path="/" exact component={ Test } />
      <Route path="/tests" component={ Tests } />
    </div>
  </Router>
)


export default BasicRouter;