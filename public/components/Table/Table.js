import Block from '../Block/Block';

import './Table.scss';
import template from './Table.tmpl.xml';

class Table extends Block {
  constructor(elements = {}) {
    super('table');
    this._getElement().appendChild(this._createTable(elements));
  }

  _createTable(elements) {
    const node = new Block('div');

    node._getElement().innerHTML = template({
      head: elements.head,
      body: elements.body,
    });

    return node.render();
  }
}

export default Table;
