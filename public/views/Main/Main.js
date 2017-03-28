import Block from '../../components/Block/Block';
import Image from '../../components/Image/Image';
import viewService from '../../services/ViewService/ViewService';
import preLoader from '../PreLoader/PreLoader';

import './Main.scss';
import template from './Main.tmpl.xml';

class Main extends Block {
  constructor() {
    super('div', {
      class: 'wrapper'
    });

    this.toDocument(preLoader.render());
  }

  init() {
    this._createWrapperMain();
  }

  _createWrapperMain() {
    const main = new Block('div', {
      class: 'main-wrapper'
    });

    main.append(this._builtMain(viewService.getState()).render());

    return main;
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
    viewService.showPreLoader();

    viewService.logout()
      .then(() => {
        viewService.hidePreLoader();
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
    if (this._getDocument().querySelector('.wrapper__main__wrapper')) {
      this._getDocument().querySelector('.wrapper__main__wrapper').style.display = 'none';
    }
  }

  show() {
    const main = this._getDocument().querySelector('.wrapper__main__wrapper');

    if (main) {
      main.style.display = 'block';
    }

    viewService.showPreLoader();

    viewService.isLogin()
      .then(response => {
        return +response.status === 200;
      })
      .then(status => {
        viewService.setState(status);
        if (!main) {
          console.log('here');

          this.toDocument(this._createWrapperMain().render());
        } else {
          console.log('here1');
          console.log(main);

          this._builtMain(viewService.getState());
        }

        viewService.hidePreLoader();
      });
  }
}

export default Main;
