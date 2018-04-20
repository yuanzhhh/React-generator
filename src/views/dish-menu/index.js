import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import BaseComponent from '@/BaseComponent';
import dispatchToProps from './dispatchToProps';
import stateToProps from './stateToProps';

import './dist-menu.scss';
@connect(stateToProps, dispatchToProps)
export default class DishMenu extends BaseComponent {
  static propTypes = {
    dishNum: PropTypes.any.isRequired,
    addDishNum: PropTypes.func.isRequired,
  }

  constructor (props) {
    super(props);

    this.bind(
      'onClick'
    );
  }

  onClick() {
    console.log(this.props.dishNum);
  }

  componentDidMount() {
    this.props.getInitData('你好');
  }

  render () {
    const { dishNum } = this.props;
    
    return (
      <div className="react-generator">
        <p>{ dishNum }</p>
        <span onClick={this.onClick}>
        { __("你好 世界") }
        </span>
        <h1>
          React-generator
        </h1>
      </div>
    )
  }
};