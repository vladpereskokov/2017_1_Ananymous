import Block from '../Block/Block';

import './Image.scss';

export default class Image extends Block {
  constructor(attributes = {}) {
    super('img', attributes);
    this.setAttributeBlock('class', 'image__big');
  }
}
