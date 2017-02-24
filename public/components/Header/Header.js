import Block from '../Block/Block';

import './Header.scss';

class Header extends Block {
  constructor(type, options = {}) {
    super('h' + type, options);
    this.setAttributeBlock('class', 'header');
  }
}

export default Header;
