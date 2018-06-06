import React from 'react';
import BaseComponent from '@/BaseComponent';

export default class Test extends BaseComponent {
    constructor (props) {
      super(props);
      this.s = null;
    }
    
    componentWillMount() {
        this.s = setInterval(() => {
            console.log('进来');
        }, 1000);
        this.props.br('嗯嗯');
    }

    componentWillUnmount() {
        clearInterval(this.s);
    }
    
    
    render () {
      return (
        <div className="react-generator">
          1111
        </div>
      )
    }
  };