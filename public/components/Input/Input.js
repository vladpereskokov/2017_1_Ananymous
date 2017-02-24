import Block from '../Block/Block';

import './Input.scss';

class Input extends Block {
  constructor(options = {}) {
    super('input', options);
    this.setAttributeBlock('class', 'input');
  }
}

export default Input;
