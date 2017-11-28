import React from 'react';
import ReactDOM from 'react-dom';

// import Test from './components/test';

const HelloMessage = () => (
    <div>
      Hello
    </div>
  );

ReactDOM.render(
    <HelloMessage name="Taylor" />,
    document.getElementById('root')
);