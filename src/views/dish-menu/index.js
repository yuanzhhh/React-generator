import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import './dist-menu.scss';

import dispatchToProps from './dispatchToProps';
import stateToProps from './stateToProps';

class DishMenu extends React.Component {

  static propTypes = {
    dishNum: PropTypes.number.isRequired,
    addDishNum: PropTypes.func.isRequired,
  }

  constructor (props) {
    super(props)
  }

  componentDidMount() {
    this.props.getInitData(66622);  
  }

  render () {
    const { dishNum } = this.props;
    
    return (
      <div>
        <span>
        { dishNum }
        { __("你你你") }
        </span>
        <h1>测试1测试1测试2123123112123313121</h1>
      </div>
    )
  }
}

export default connect(stateToProps, dispatchToProps)(DishMenu);