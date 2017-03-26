import Block from '../../components/Block/Block';
import Image from '../../components/Image/Image';
import viewService from '../../services/ViewService/ViewService';

import './Main.scss';
import template from './Main.tmpl.xml';

class Main extends Block {
  constructor() {
    super('div', {
      class: 'wrapper'
    });

    this._state = false;
  }

  init() {
    this.toDocument(this._getBackground());
    this._builtMain();
  }

  _builtMain(state = false) {
    this._getElement().innerHTML = template(this._changeForm(state));
    this.toDocument(this._getElement());

    state ? this._logoutButton() : this._setEventUnLoggedForm();

    return this;
  }

  _getBackground() {
    return new Image().render();
  }

  _changeForm(state) {
    return state ? this._getLoggedForm() : this._getUnLoggedForm();
  }

  _setEventUnLoggedForm() {
    this._setEventButton(this._getRegisterButtons()[0], () => viewService.go('/signin'));
    this._setEventButton(this._getRegisterButtons()[1], () => viewService.go('/signup'));
  }

  _setEventButton(findButton, onclickFunction) {
    findButton.onclick = () => {
      onclickFunction();
    };
  }

  _getRegisterButtons() {
    return document.getElementsByClassName('wrapper__main__form__button');
  }

  logout() {
    viewService.logout()
      .then(() => {
      this.resume();
      });
  }

  _logoutButton() {
    const button = this._findLogoutButton();

    if (button) {
      button.addEventListener('click', this.logout.bind(this));
      button.style.display = 'block';
    }
  }

  _findLogoutButton() {
    return (document.getElementsByName('logout'))[0];
  }

  _getUnLoggedForm() {
    return {
      buttons: [{
        text: 'Sign In',
      }, {
        text: 'Register'
      }]
    };
  }

  _getLoggedForm() {
    return {
      buttons: [{
        text: 'Game',
        action: '/game'
      }, {
        text: 'Scoreboard',
        action: '/scoreboard'
      }]
    };
  }

  _createMain(state) {
    if (state !== this._state) {
      this._builtMain(state);
      this._state = state;
    }
  }

  hide() {}

  resume() {
    this._createMain(viewService.getState());
  }
}

export default Main;
