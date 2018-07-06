import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import BaseComponent from '@/BaseComponent';
import wrapDidMount from '@/wrapDidMount';
import dispatchToProps from './dispatchToProps';
import stateToProps from './stateToProps';
import composeAction from '../../components/composeAction';
import initDidMountList from './initDidMountList';

import './dist-menu.scss';

const { initList, initType } = initDidMountList;
const composeProps = composeAction(initList, dispatchToProps);

@connect(stateToProps, composeProps)
export default class DishMenu extends BaseComponent {
  static propTypes = {
    dishNum: PropTypes.any.isRequired,
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

  @wrapDidMount(initList, initType)
  componentDidMount() {

  }

  render () {
    const { dishNum } = this.props;
    
    return (
      <div className="react-generator">
        <p>{ dishNum }</p>
        <span onClick={this.onClick}>
        </span>
        <h1>
          React-generator
        </h1>
      </div>
    )
  }
};