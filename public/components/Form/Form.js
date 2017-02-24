import 'whatwg-fetch';
import Block from '../Block/Block';

export default class Form extends Block {
  constructor(formAttributes = {}, elements = []) {
    super('form', formAttributes);
    this._createForm(elements);
  }

  _createForm(elements) {
    this._setElements(elements);
  }

  _setElements(elements) {
    elements.forEach(element => {
      this._addElement(element.element, element);
    });
  }

  _addElement(name, attributes) {
    const element = this._createBlock(name, attributes);

    if (attributes.type === 'submit') {
      element.start('click', event => this._submit(event));
    }

    this._setElement(element);
  }

  _submit(event) {
    event.preventDefault();

    const data = this._getData();

    fetch('/users', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: data.inputEmail,
        password: data.inputPassword
      }),
      credentials: 'include'
    })
      .then(response => console.log('Request succeeded with JSON response', response))
      .catch(error => console.log('Request failed', error));
  }

  _setElement(element) {
    this._getElement().append(element.render());
  }

  _getData() {
    return this._getFields(this._getElement().elements);
  }

  _getFields(elements) {
    const fields = {};

    this._getKeys(elements).forEach((element) => {
      const id = elements[element].id;
      const value = elements[element].value;
      if (id) {
        fields[id] = value;
      }
    });

    return fields;
  }
}
