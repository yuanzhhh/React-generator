import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import './dist-menu.scss';

import BaseComponent from '@/BaseComponent';
import dispatchToProps from './dispatchToProps';
import stateToProps from './stateToProps';

class DishMenu extends BaseComponent {

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
}

export default connect(stateToProps, dispatchToProps)(DishMenu);