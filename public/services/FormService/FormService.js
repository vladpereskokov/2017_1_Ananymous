import isCompare from '../../modules/OtherScripts/Validators/isComapre/isComapre';
import isEmail from '../../modules/OtherScripts/Validators/isEmail/isEmail';
import isFill from '../../modules/OtherScripts/Validators/isFill/isFill';
import isLogin from '../../modules/OtherScripts/Validators/isLogin/isLogin';
import isPassword from '../../modules/OtherScripts/Validators/isPassword/isPassword';
import transport from '../../modules/Transport/Transport';

class FormService {
  constructor() {
    if (FormService.__instance) {
      return FormService.__instance;
    }

    this._login = '';
    this._email = '';
    this._password = '';
    this._passwordRepeat = '';
    this._data = {};
    this._response = {};

    FormService.__instance = this;
  }

  sendRequest(uri) {
    return transport(uri, JSON.stringify(this._data));
  }

  checkFill(field, type) {
    if (isFill(field)) {
      return {
        response: `Заполните поле ${type}!`
      };
    }
  }

  checkLogin(login) {
    if (!isLogin(login)) {
      return {
        response: 'Введите корректный логин!'
      }
    }
  }

  checkEmail(email) {
    if (!isEmail(email)) {
      return {
        response: 'Введите корректный e-mail!'
      }
    }
  }

  checkPassword(password) {
    if (!isPassword(password)) {
      return {
        response: 'Введите корректный пароль!'
      }
    }
  }

  checkPasswords(lhs, rhs) {
    if (!isCompare(lhs, rhs)) {
      return {
        response: 'Пароли не совпадают!'
      }
    }
  }
}
