import Block from '../Block/Block';
import Button from '../Button/Button';
import userService from '../../services/UserService/UserService';
import formService from '../../services/FormService/FormService';
import viewService from '../../services/ViewService/ViewService';

import './Form.scss';
import template from './Form.tmpl.xml';

export default class Form extends Block {
  constructor(elements = {}) {
    super('div', {
      class: 'form__wrapper'
    });

    this._createForm(elements.data);
  }

  _createForm(elements) {
    const titleForm = elements.title;

    this._getElement().innerHTML = template({
      title: titleForm,
      elements: elements.fields
    });

    this._find('form').appendChild((this._submitButton(elements.controls[0]).render()));
    this._inputsFocusEvent();
  }

  _inputsFocusEvent() {
    const form = this._find('form');

    this._getKeys(form).forEach(input => {
      const element = form[input];
      console.log(form.querySelector('ul'));
      if (element.name) {
        this._setFocus(element);
      }
    });
  }

  _setFocus(input) {
    input.onblur = (() => {
      const name = input.name;
      const value = input.value;
      const fill = formService.checkFill(value, this._getReadableNameByName(name)).response;

      if (fill) {
        this._addError(input, fill);
      } else {
        const check = this._checkByName(name, value).response;

        if (check) {
          this._addError(input, check);
          return;
        }

        // if (name === 'password1') {
        //   const secondPassword = this._getNextPassword(input);
        //   console.log(secondPassword);
        //   if (secondPassword.classList.contains('error') &&
        //     formService.checkPasswords(input, secondPassword).response) {
        //     this._defaultError(secondPassword);
        //   }
        // }
        //
        // if (input.name === 'password2') {
        //   const firstPassword = this._getPreviousPassword(input).value;
        //   const compare = formService.checkPasswords(value, firstPassword).response;
        //
        //   if (compare) {
        //     this._addError(input, compare);
        //     return;
        //   }
        // }

        this._addOK(input);
      }
    });

    input.onfocus = (() => {
      this._defaultError(input);
    });
  }

  _addOK(input) {
    input.classList.add('ok');
  }

  _addError(input, errorText) {
    const li = input.nextElementSibling;

    li.classList.add('error');
    li.innerText = errorText;
  }

  _defaultError(input) {
    const li = input.nextElementSibling;

    li.classList.remove('error');
    li.classList.remove('ok');
  }

  _checkByName(type, value) {
    switch (type) {
      case 'login':
        return formService.checkLogin(value);
      case 'email':
        return formService.checkEmail(value);
      case 'password1':
      case 'password2':
        return formService.checkPassword(value);
      default:
        return '';
    }
  }

  _getReadableNameByName(type) {
    switch (type) {
      case 'login':
        return 'логин';
      case 'email':
        return 'e-mail';
      case 'password1':
      case 'password2':
        return 'пароль';
      default:
        return '';

    }
  }

  _submitButton(button) {
    const submit = new Button({
      type: 'submit',
      text: button.text
    });

    submit.start('click', event => this._submit(event, button.action));

    return submit;
  }

  _submit(event, uri) {
    event.preventDefault();

    const data = this._getData();

    formService.sendRequest(uri, this._getSendPack(uri, data))
      .then(response => {
        userService.setState(+response.status !== 200);
        viewService.go('/');
      });
  }

  _getSendPack(uri, data) {
    return uri === '/signin' ? this._signInPack(data) : this._signUpPack(data);
  }

  _signInPack(data) {
    return {
      'username': data.email,
      'password': data.password1
    };
  }

  _signUpPack(data) {
    return {
      'login': data.login,
      'email': data.email,
      'password': data.password1
    };
  }

  _getData() {
    const form = this._find('form').elements;
    const fields = {};

    this._getKeys(form).forEach(input => {
      const name = form[input].name;

      if (name) {
        fields[name] = form[input].value;
      }
    });
    return fields;
  }

  _getPreviousElement(input) {
    return input.previousElementSibling;
  }

  _getNextElement(input) {
    return input.nextElementSibling;
  }

  _getPreviousPassword(passwordInput) {
    return passwordInput.previousElementSibling.previousElementSibling;
  }

  _getNextPassword(passwordInput) {
    return passwordInput.nextElementSibling.nextElementSibling;
  }
}
