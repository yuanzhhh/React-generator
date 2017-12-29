import React from 'react';

export default class BaseComponent extends React.Component {
    constructor(...opt){
        super(...opt);
    }

    bind(...methods) {
        methods.forEach(element => {
            this[element] = this[element].bind(this);
        });
    }

    shouldComponentUpdate(nextProps, nextState) {
        const thisProps = this.props || {};
        const thisState = this.state || {};

        const nextPropsClone = nextProps || {};
        const nextStateClone = nextState || {};

        const thisPropsKeyList = Object.keys(thisProps);
        const nextPropsKeyList = Object.keys(nextPropsClone);

        const thisStateKeyList = Object.keys(thisState);
        const nextStateKeyList = Object.keys(nextStateClone);

        if (
            thisPropsKeyList.length !== nextPropsKeyList.length ||
            thisStateKeyList.length !== nextStateKeyList.length
        ) {
            return true;
        }

        for (const keys in nextPropsClone) {
            if ( nextPropsClone[keys] !== thisProps[keys] ) {
                return true;
            }
        }

        for (const keys in nextStateClone) {
            if ( nextStateClone[keys] !== thisState[keys] ) {
                return true;
            }
        }
        
        return false;
    }
}