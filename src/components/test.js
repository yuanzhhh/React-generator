import React from 'react';
import Tests from './tests';

import update from 'immutability-helper';
export default class Test extends React.Component {
  constructor (props) {
    super(props)
  }

  componentDidMount() {
    // const obj = { a: 5, b: { a: 2 } };

    // // const a = update(obj, {b: {$set: obj.b.a * 2 }});
    // // const b = update(obj, {b: {a: {$set: obj.b.a * 2 }}});
    // // const c = update(obj, {b: {$set: obj.b.a * 2 }});

    // const a = obj.b.a = obj.b.a * 2;
    // const b = obj.b.a = obj.b.a * 2;
    // const c = obj.b.a = obj.b.a * 2;

    // console.log('a.a === b.a', a.a === b.a);
    // console.log('a.b === b.b', a.b === b.b);

    // console.log('a === b', a === b);
    // console.log('c === b', c === b);
    // console.log('c === a', c === a);

    // console.log('c.a === a.a', c.a === a.a);
    // console.log('c.b === a.b', c.b === a.b);
  }

  render () {

        const obj = { a: 5, b: { a: 2 } };
    
        const a = update(obj, {b: {$set: {a: obj.b.a * 2} }});
        const b = update(obj, {b: {a: {$set: obj.b.a * 2 }}});
        const c = update(obj, {b: {$set: {a: obj.b.a * 2} }});
    
        // obj.b.a = obj.b.a * 2;
        // const a = obj;
        // obj.b.a = obj.b.a * 2;
        // const b = obj;
        // obj.b.a = obj.b.a * 2;
        // const c = obj;

        console.log('a.a === b.a', a.a === b.a);
        console.log('a.b === b.b', a.b === b.b);
    
        console.log('a === b', a === b);
        console.log('c === b', c === b);
        console.log('c === a', c === a);
    
        console.log('c.a === a.a', c.a === a.a);
        console.log('c.b === a.b', c.b === a.b);

        console.log(a, b, c);

        const q = update(a, {b: {$set: {a: obj.b.a * 5} }});

        console.log('a === q', a === q);
        console.log('a.a === q.a', a.a === q.a);
        console.log('a.b === q.b', a.b === q.b);


    return (
      <div>
        aaasasdadaadas
        <Tests/>
      </div>
    )
  }
}