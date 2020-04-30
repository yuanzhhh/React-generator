import React from 'react';

export default class BaseComponent extends React.PureComponent {
    bind(...methods) {
        methods.forEach(element => {
            this[element] = this[element].bind(this);
        });
    }
}
