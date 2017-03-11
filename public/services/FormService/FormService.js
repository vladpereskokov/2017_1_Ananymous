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

    FormService.__instance = this;
  }

  sendRequest(uri) {
    return transport(uri, JSON.stringify(this._data));
  }

  checkFill(field, type) {
    return {
      response: this._getStringByCondition(isFill(field), `Заполните поле ${type}!`)
    };
  }

  checkLogin(login) {
    return {
      response: this._getStringByCondition(!isLogin(login), 'Введите корректный логин!')
    }
  }

  checkEmail(email) {
    return {
      response: this._getStringByCondition(!isEmail(email), 'Введите корректный e-mail!')
    }
  }

  checkPassword(password) {
    return {
      response: this._getStringByCondition(isPassword(password), 'Введите корректный пароль!')
    }
  }

  checkPasswords(lhs, rhs) {
    return {
      response: this._getStringByCondition(!isCompare(lhs, rhs), 'Пароли не совпадают!')
    }
  }

  isFindField(value, type) {
    let form = {
      'login': `test${Math.floor(Math.random() * (1000 - 1)) + 1}`,
      'email': `qweqasdfw${Math.floor(Math.random() * (1000 - 1)) + 1}@mail.rq`,
      'password': 'qwertyqwerty'
    };
    form[type] = value;
    console.log(form);

    // Check user api

    return transport.post('/signup', JSON.stringify(form));
  }

  _getStringByCondition(condition, string) {
    return condition ? string : '';
  }
}

const formService = new FormService();

export default formService;
