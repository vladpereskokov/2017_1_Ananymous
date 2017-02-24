import Block from '../Block/Block';

import './Button.scss';

class Button extends Block {
  constructor(options = {}) {
    super('button', options);
    this._initialize();
  }

  _initialize() {
    this.setAttributeBlock('class', 'primary');
  }
}

export default Button;
