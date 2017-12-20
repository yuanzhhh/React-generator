import React from 'react';
import './test.scss';

export default class Tests extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      test: 1,
    }
  }

  componentDidMount() {
    this.setState({
      test: 12,
    });
  }

  render () {
    const { test } = this.state;
    return (
      <div>
        <span>
        {test}{__("你你你")}
        </span>
        <h1>测试1测试1测试1</h1>
      </div>
    )
  }
}