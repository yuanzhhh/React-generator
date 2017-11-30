import React from 'react';
import './test.scss';

import styled from 'styled-components';

const Title = styled.h1`
  font-size: 1.5em;
  text-align: center;
  color: palevioletred;
`;

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
    const test = this.state.test;
    return (
      <div>
        <span>
        {test}{__("你你你")}
        </span>
        <Title>测试1测试1测试1</Title>
      </div>
    )
  }
}