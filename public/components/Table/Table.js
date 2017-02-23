import Block from '../Block/Block';

class Table extends Block {
  constructor(attributes = {}, elements = {}) {
    super('table', attributes);
    this._createTable(elements);
  }

  _createTable(elements) {
    this._setHead(elements.head);
    this._setBody(elements.body);
  }

  _setHead(elements) {
    const head = Block._createBlock('thead');
    head.append(Block._createBlock('tr').render());
    Table.setContent(head, elements, 'th');
    this.append(head.render());
  }

  static setContent(block, elements, tag) {
    elements.forEach(element => {
      block.append(Block._createBlock(tag, {
        'text' : element
      }).render());
    });
  }

  _setBody(elements) {
    const body = Block._createBlock('tbody');
    elements.forEach(element => {
      const row = Block._createBlock('tr');
      Table.setContent(row, element, 'td');
      body.append(row.render());
    });
    this.append(body.render());
  }
}

export default Table;
