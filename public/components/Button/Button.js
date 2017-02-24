import Block from '../Block/Block';

import './Button.scss';

class Button extends Block {
  constructor(options = {}) {
    super('button', options);
    this.setAttributeBlock('class', 'button');
  }
}

export default Button;
