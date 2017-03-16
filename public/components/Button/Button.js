import Block from '../Block/Block';

import './Button.scss';

class Button extends Block {
  constructor(options = {}) {
    super('button', options);
    this.setAttributeBlock('class', 'button');
  }

  start(event, callback) {
    this._getElement().addEventListener(event, callback);
  }
}

export default Button;
