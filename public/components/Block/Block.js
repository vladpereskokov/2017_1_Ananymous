export default class Block {
  constructor(name, attributes = {}) {
    this._name = name;
    this._element = this._createDocumentElement(this._getNameElement());
    delete attributes.block;
    this.setAttributes(attributes);
  }

  setAttribute(name, value) {
    this._getElement().setAttribute(name, value);
  }

  setAttributes(attributes) {
    this._setText(attributes);
    this._getKeys(attributes).forEach(name => {
      this._setAttribute(name, attributes[name]);
    });
  }

  setText(text) {
    this._getElement().textContent = text;
  }

  append(child) {
    this._getElement().appendChild(child);
  }

  render() {
    return this._getElement();
  }

  renderTo(element) {
    element.appendChild(this.render());
  }

  remove() {
    document.querySelector(this._getNameElement()).remove();
  }

  start(event, callback) {
    this._getElement().addEventListener(event, callback);
  }

  search(block) {
    return this._getElement().querySelector(block);
  }

  _createDocumentElement(name) {
    return document.createElement(name);
  }

  _createBlock(name, options = {}) {
    return new Block(name, options);
  }

  _setAttribute(name, value) {
    return typeof value === 'boolean' ? this.setAttribute(name, name) : this.setAttribute(name, value);
  }

  _getNameElement() {
    return this._name;
  }

  _setText(attributes) {
    if (this._checkText(attributes)) {
      this.setText(attributes.text);
      delete attributes.text;
    }
  }

  _checkText(attributes) {
    return attributes.text !== undefined;
  }

  _getElement() {
    return this._element;
  }

  _getKeys(data) {
    return Object.keys(data);
  }
}
