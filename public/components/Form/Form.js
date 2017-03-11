import Block from '../Block/Block';
import Button from '../Button/Button';
import transport from '../../modules/Transport/Transport';
import userService from '../../services/UserService/UserService';
import formService from '../../services/FormService/FormService';

import './Form.scss';
import template from './Form.tmpl.xml';

export default class Form extends Block {
  constructor(elements = {}) {
    super('div', {
      class: 'form z-depth-2'
    });

    this._isTrueForm = true;

    this._createForm(elements.data);
  }

  _createForm(elements) {
    const titleForm = elements.title;

    this._getElement().innerHTML = template({
      title: titleForm,
      elements: elements.fields
    });

    this._find('form').appendChild((this._submitButton(elements.controls[0], elements.controls[1].action).render()));
    this.append(this._backButton(elements.controls[1].action).render());
    this._inputsFocusEvent();
  }

  _inputsFocusEvent() {
    const form = this._find('form').elements;

    this._getKeys(form).forEach(input => {
      const element = form[input];
      if (element.type) {
        this._setFocus(element);
      }
    });
  }

  _setFocus(input) {
    input.onblur = (() => {
      const type = input.type;
      const value = input.value;
      const fill = formService.checkFill(value, type).response;

      if (fill) {
        this._addError(input, fill);
      } else {
        const check = this._checkByType(type, value).response;
        if (check) {
          alert(check);
          this._addError(input, check);
          return;
        }

        if (input.name === 'password2') {
          const passwordFirst = this._getPreviousPassword(input);
          const compare = formService.checkPasswords(value, passwordFirst).response;

          if (compare) {
            this._addError(input, compare);
          }
        }
      }
    });

    input.onfocus = (() => {
      this._defaultError(input);
    });
  }

  _addError(input, errorText) {
    const label = input.nextElementSibling;

    input.classList.add('error');
    label.innerText = errorText;
  }

  _defaultError(input) {
    const label = input.nextElementSibling;

    input.classList.remove('error');
    label.innerText = '';
  }

  _checkByType(type, value) {
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

  _submitButton(button, backAction) {
    const submit = new Button({
      type: 'submit',
      text: button.text
    });

    submit.start('click', event => this._submit(event, button.action, backAction));

    return submit;
  }

  _backButton(action) {
    const back = new Button({
      type: 'submit',
      text: 'Back'
    });

    back.start('click', action);

    return back;
  }

  _submit(event, uri, backAction) {
    event.preventDefault();
    this._isTrueForm = true;

    const data = this._getData();
    // this._checkFields(data);
    // service check data

    if (this._isTrueForm) {

      transport.post(uri, JSON.stringify(this._getSendPack(uri, data)))
        .then(response => {
          return +response.status !== 200 ? response.json() : null;
        })
        .then(data => {
          const element = this._find('p');
          const status = data == null;

          element.textContent = (status) ? '' : data.message;
          userService.setState(status);

          if (status) {
            backAction();
          }
        });
    }
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

  _getPreviousPassword(input) {
    return input.previousElementSibling.previousElementSibling;
  }
}
