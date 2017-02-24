import 'whatwg-fetch';
import Block from '../Block/Block';
import Button from '../Button/Button';
import Input from '../Input/Input';
import Label from '../Label/Label';
import Header from '../Header/Header';

import './Form.scss';

export default class Form extends Block {
  constructor(elements = []) {
    super('form', { class: 'form z-depth-2' });
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

  _addElement(name, attributes = {}) {
    const element = this._createElement(name, attributes);

    if (attributes.type === 'submit') {
      element.start('click', event => this._submit(event));
    }

    this._setElement(element);
  }

  _createElement(type, attributes) {
    switch (type) {
      case 'title':
        return new Header(2, attributes);
      case 'label':
        return new Label(attributes);
      case 'input':
        return new Input(attributes);
      case 'button':
        return new Button(attributes);
      default:
        return null;
    }
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
    this.append(element.render());
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
