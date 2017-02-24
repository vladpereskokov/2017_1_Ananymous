import Block from '../Block/Block';

import './Label.scss';

class Label extends Block {
  constructor(options = {}) {
    super('label', options);
    this.setAttributeBlock('class', 'primary');
  }
}

export default Label;
