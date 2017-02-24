import Block from '../Block/Block';

class Header extends Block {
  constructor(type, options = {}) {
    super('h' + type, options);
    this.setAttributeBlock('class', 'primary');
  }
}

export default Header;
