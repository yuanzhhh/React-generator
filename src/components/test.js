import React from 'react';
import Tests from './tests';
export default class Test extends React.Component {
  constructor (props) {
    super(props)
  }

  componentWillMount () {
    console.log('@!#');
  }

  render () {
    return (
      <div>
        aaasasdadaadasdasdasd
        <Tests/>
      </div>
    )
  }
}