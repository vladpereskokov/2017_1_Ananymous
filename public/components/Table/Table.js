import Block from '../Block/Block';

import './Table.scss';
import template from './Table.tmpl.xml';

class Table extends Block {
  constructor(elements = {}) {
    super('div', { class: 'z-depth-2 scoreboard' });
    this._createTable(elements);
  }

  _createTable(elements) {
    this._getElement().innerHTML = template({
      head: elements.head,
      body: elements.body
    });
  }
}

export default Table;
