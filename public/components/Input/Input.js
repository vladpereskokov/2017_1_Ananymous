import Block from '../Block/Block';

import './Input.scss';

class Input extends Block {
  constructor(options = {}) {
    super('input', options);
    this.setAttributeBlock('class', 'primary');
  }
}

export default Input;
