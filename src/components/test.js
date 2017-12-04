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

        const obj = { 
            b: {
              a: {
                b: 1,
              }
            },
            c: {
              b: [1,2,3],
            }
          };
    
        const a = update(obj, {b: {$set: {a: { b:123 }} }});
        const b = update(obj, {b: {$set: {a: { b:123 }} }});

        const c = update(obj, {c: {b: {$push: [4, 5]} }});

        const d = update(c, {c: {b: {$push: [6, 7]} }});

        // obj.b.a = { b: 123 };
        // const a = obj;
        // obj.b.a = { b: 123 };
        // const b = obj;

        console.log(a.b === b.b);
        console.log(a.c === b.c);
        
        console.log(c.b === a.b);
        console.log(c.c === a.c);
        console.log(c.c === a.c);

        console.log(d.b === a.b);
        console.log(d.b === c.b);

    return (
      <div>
        aaasasdadaadas
        <Tests/>
      </div>
    )
  }
}