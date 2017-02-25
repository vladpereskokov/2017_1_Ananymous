import 'whatwg-fetch';
import Block from '../Block/Block';
import Button from '../Button/Button';

import './Form.scss';
import template from './Form.tmpl.xml';

export default class Form extends Block {
  constructor(elements = []) {
    super('div', {class: 'form z-depth-2'});
    this._createForm(elements);
  }

  _createForm(elements) {
    this._getElement().innerHTML = template({
      title: elements[0].text,
      elements: elements.slice(1, elements.length - 2),
    });

    this.append(this._submitButton(elements[elements.length - 2].text).render());
    this.append(this._backButton(elements[elements.length - 1].action).render());
  }

  _submitButton(buttonText) {
    const submit = new Button({
      type: 'submit',
      text: buttonText,
    });

    submit.start('click', event => this._submit(event));

    return submit;
  }

  _backButton(action) {
    const back = new Button({
      type: 'submit',
      text: 'Back',
    });

    back.start('click', action);

    return back;
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
