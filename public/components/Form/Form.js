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

    this._checkFields(data);

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

  _checkFields(data) {
    return 'password2' in data ? this._checkSignUpForm(data) :
      this._checkSignInForm(data);
  }

  _checkSignInForm(data) {
    const email = this._checkEmail(data.email);
    const password = this._checkPassword1(data.password1);

    if (!email.check) {
      this._addError('email', email.text);
    }

    if (!password.check) {
      this._addError('password1', password.text);
    }
  }

  _checkEmail(email) {
    if (this._isFill(email)) {
      return {
        check: false,
        text: 'Заполните поле email'
      };
    }

    if (!this._validateEmail(email)) {
      return {
        check: false,
        text: 'Введите верный email'
      }
    }
  }

  _validateEmail(email) {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
  }

  _isFill(field) {
    return field.trim().length === 0;
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
