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
    const main = new Block('div', {
      class: 'main-wrapper'
    });
    main.append(this._builtMain(viewService.getState()).render());
    this.toDocument(main.render());
  }

  _builtMain(state = false) {
    this._getElement().innerHTML = template(this._changeForm(state));

    this.toDocument(this._getElement());

    if (state) {
      this._setEventLoggedForm();
      this._logoutButton();
      this._setFormRotate();
    } else {
      this._setEventUnLoggedForm();
    }

    return this;
  }

  _setFormRotate() {
    const form = this.find('.wrapper__main__form');
    form.classList.add('wrapper__main__form__game-design');
  }

  _getBackground() {
    return new Image().render();
  }

  _changeForm(state) {
    return state ? this._getLoggedForm() : this._getUnLoggedForm();
  }

  _setEventUnLoggedForm() {
    this._setEventButton(this._getButtons()[0], () => viewService.go('/signin'));
    this._setEventButton(this._getButtons()[1], () => viewService.go('/signup'));
  }

  _setEventLoggedForm() {
    this._setEventButton(this._getButtons()[0], () => viewService.go('/game'));
    this._setEventButton(this._getButtons()[1], () => viewService.go('/scoreboard'));
  }

  _setEventButton(findButton, onclickFunction) {
    findButton.onclick = () => {
      onclickFunction();
    };
  }

  _getButtons() {
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
        text: 'SIGN IN',
      }, {
        text: 'REGISTER'
      }]
    };
  }

  _getLoggedForm() {
    return {
      buttons: [{
        text: 'GAME',
        class: 'button-rotate',
        action: '/game'
      }, {
        text: 'SCOREBOARD',
        class: 'button-rotate',
        action: '/scoreboard'
      }]
    };
  }

  hide() {
    this._getDocument().querySelector('.wrapper__main__wrapper').style.display = 'none';
  }

  show() {
    this._getDocument().querySelector('.wrapper__main__wrapper').style.display = 'block';

    viewService.isLogin()
      .then(response => {
        return +response.status === 200;
      })
      .then(status => {
        if (status !== this._state) {
          viewService.setState(status);
          this._builtMain(viewService.getState());
          this._state = status;
        }
      });
  }
}

export default Main;
