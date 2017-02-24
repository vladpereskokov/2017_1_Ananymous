import Block from '../Block/Block';

import './Button.scss';

class Button extends Block {
  constructor(options = {}) {
    super('button', options);
    this.setAttributeBlock('class', 'primary');
  }
}

export default Button;
