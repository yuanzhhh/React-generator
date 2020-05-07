import React from 'react';

export default class Test extends React.PureComponent {
  onClick() {
    location.href = '/DishMenu';
  }

  render () {
    return (
      <div className="react-generator">
        <span onClick={this.onClick}>
          11111
        </span>
      </div>
    )
  }
}
