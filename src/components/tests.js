import React from 'react';
import './test.scss';

export default class Tests extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      test: 1,
    }
  }

  componentWillMount () {
  }

  componentDidMount() {
    
    this.setState({
      test: 3,
    });
  }

  render () {
    const test = this.state.test;
    return (
      <div>
        <span>
        {test}{__("你你你")}aasdasdasd
        </span>
      </div>
    )
  }
}