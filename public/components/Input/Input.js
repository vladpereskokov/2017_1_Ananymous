import Block from '../Block/Block';

import './Input.scss';

class Input extends Block {
  constructor(options = {}) {
    super('input', options);
    this._initialize();
  }

  _initialize() {
    this.setAttributeBlock('class', 'primary');
  }
}

export default Input;
