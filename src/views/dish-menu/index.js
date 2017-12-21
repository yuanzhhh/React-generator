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
    setTimeout(()=>{
      this.props.addDistNumAsync(1000);  
    }, 3000);
  }

  render () {
    const { dishNum } = this.props;

    return (
      <div>
        <span>
        { dishNum }
        { __("你你你") }
        </span>
        <h1>测试1测试1测试1</h1>
      </div>
    )
  }
}

export default connect(stateToProps, dispatchToProps)(DishMenu);