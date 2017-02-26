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
    const titleForm = elements[0].text;

    this._getElement().innerHTML = template({
      title: titleForm,
      elements: elements.slice(1, elements.length - 2),
    });

    this._find('form').appendChild((this._submitButton(elements[elements.length - 2].text, titleForm).render()));
    this.append(this._backButton(elements[elements.length - 1].action).render());
  }

  _submitButton(buttonText, titleForm) {
    const submit = new Button({
      type: 'submit',
      text: buttonText,
    });

    submit.start('click', event => this._submit(event, titleForm));

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

  _submit(event, titleForm) {
    event.preventDefault();
    const data = this._getData(titleForm);



    // alert(data[0]);

    // fetch('/users', {
    //   method: 'POST',
    //   headers: {
    //     'Content-Type': 'application/json',
    //   },
    //   body: JSON.stringify({
    //     email: data.inputEmail,
    //     password: data.inputPassword
    //   }),
    //   credentials: 'include'
    // })
    //   .then(response => console.log('Request succeeded with JSON response', response))
    //   .catch(error => console.log('Request failed', error));
  }

  _getData(titleForm) {
    const form = (document.getElementsByName(titleForm)[0]).elements;
    const fields = {};
    Object.keys(form).forEach((input) => {
      const name = form[input].name;

      if (name) {
        fields[name] = form[input].value;
      }
    });
    return fields;
  }
}
