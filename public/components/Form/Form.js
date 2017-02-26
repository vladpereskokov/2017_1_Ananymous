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

  _checkSignUpForm(data) {
    this._checkSignInForm(data);

    const login = 'login';
    const passwordRepeat = 'password2';
    const loginElement = this._checkLogin(data.login);
    const passwordRepeatElement = this._checkPasswordRepeat(data.password1, data.password2);

    this._defaultError(login);
    this._defaultError(passwordRepeat);

    if (!loginElement.check) {
      this._addError(login, loginElement.text);
    }

    if (!passwordRepeatElement.check) {
      this._addError(passwordRepeat, passwordRepeatElement.text);
    }
  }

  _checkSignInForm(data) {
    const email = 'email';
    const password = 'password1';
    const emailElement = this._checkEmail(data.email);
    const passwordElement = this._checkPassword(data.password1);

    this._defaultError(email);
    this._defaultError(password);

    if (!emailElement.check) {
      this._addError(email, emailElement.text);
    }

    if (!passwordElement.check) {
      this._addError(password, passwordElement.text);
    }
  }

  _defaultError(name) {
    const elementInput = this._find(`input[name=${name}]`);
    const elementLabel = this._find(`label[name=${name}]`);

    elementInput.classList.remove('error');
    elementLabel.innerText = '';
  }

  _addError(name, text) {
    const elementInput = this._find(`input[name=${name}]`);
    const elementLabel = this._find(`label[name=${name}]`);

    elementInput.classList.add('error');
    elementLabel.innerText = text;
  }

  _checkLogin(login) {
    if (this._isFill(login)) {
      return {
        check: false,
        text: 'Заполните поле login'
      };
    }

    if (!this._validateLogin(login)) {
      return {
        check: false,
        text: 'Введите верный login'
      }
    }

    return {
      check: true
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

    return {
      check: true
    }
  }

  _checkPassword(password) {
    if (this._isFill(password)) {
      return {
        check: false,
        text: 'Заполните поле password'
      };
    }

    const regExpPassword = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?!.*\s).*$/;

    if (password.length < 8 && !regExpPassword.test(password)) {
      return {
        check: false,
        text: 'Введите корректный password'
      };
    }

    return {
      check: true
    }
  }

  _checkPasswordRepeat(password1, password2) {
    const isPassword = this._checkPassword(password2);

    if (!isPassword.check) {
      return isPassword;
    }

    if (password1 !== password2) {
      return {
        check: false,
        text: 'Пароли не совпадают'
      };
    }

    return {
      check: true
    }
  }

  _validateLogin(login) {
    const regExpLogin = /^[a-zA-Z](.[a-zA-Z0-9_-]*)$/;
    return regExpLogin.test(login);
  }

  _validateEmail(email) {
    const regExpEmail =
      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return regExpEmail.test(email);
  }

  _isFill(field) {
    return field.trim().length === 0;
  }

  _getData(titleForm) {
    const form = (document.getElementsByName(titleForm)[0]).elements;
    const fields = {};

    this._getKeys(form).forEach((input) => {
      const name = form[input].name;

      if (name) {
        fields[name] = form[input].value;
      }
    });
    return fields;
  }
}
