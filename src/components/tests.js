import React from 'react';
import './test.scss'
export default class Tests extends React.Component {
  constructor (props) {
    super(props)
  }

  componentWillMount () {
    console.log('@!#');
  }

  render () {
    return (
      <div>
        <span>
        aaaa
        </span>
      </div>
    )
  }
}