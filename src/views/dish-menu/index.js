import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import './dist-menu.scss';

import BaseComponent from '@/BaseComponent';
import dispatchToProps from './dispatchToProps';
import stateToProps from './stateToProps';

class DishMenu extends BaseComponent {

  static propTypes = {
    dishNum: PropTypes.number.isRequired,
    addDishNum: PropTypes.func.isRequired,
  }

  constructor (props) {
    super(props);
    this.bind(
      'onClicks'
    );
  }

  onClicks() {
    console.log(this.props.dishNum);
  }

  componentDidMount() {
    this.props.getInitData(666);
  }

  render () {
    const { dishNum } = this.props;
    
    return (
      <div>
        <span onClick={this.onClicks}>
        { dishNum }
        { __("你你你") }
        </span>
        <h1 data-w-750-235>测试1测试1测试aw</h1>
      </div>
    )
  }
}

export default connect(stateToProps, dispatchToProps)(DishMenu);