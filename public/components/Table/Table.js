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
    const head = this._createBlock('thead');
    head.append(this._createBlock('tr').render());
    this.setContent(head, elements, 'th');
    this.append(head.render());
  }

  setContent(block, elements, tag) {
    elements.forEach(element => {
      block.append(this._createBlock(tag, {
        'text' : element
      }).render());
    });
  }

  _setBody(elements) {
    const body = this._createBlock('tbody');

    elements.forEach(element => {
      const row = this._createBlock('tr');
      this.setContent(row, element, 'td');
      body.append(row.render());
    });

    this.append(body.render());
  }
}

export default Table;
