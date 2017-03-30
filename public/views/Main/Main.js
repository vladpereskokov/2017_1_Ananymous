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

    this._state = false;
    this._isAnimate = 0;
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
    this._getElement().innerHTML = template(this._chooseForm(state));

    if (this._isAnimate > 1) {
      this.find('.wrapper__main__wrapper').classList.remove('animation-open');
    }

    this.toDocument(this._getElement());

    if (state) {
      this._changeForm();
    }

    if (state) {
      this._setLoggedForm();
    } else {
      this._setEventUnLoggedForm();
    }

    this._setMainButtons();
    ++this._isAnimate;

    return this;
  }

  _changeForm() {
    const buttons = this._getButtons();

    buttons[0].querySelector('div').classList.add('game__background');
    buttons[0].querySelector('a').classList.add('game__button');
    buttons[1].querySelector('div').classList.add('game__background');
    buttons[1].querySelector('a').classList.add('game__button');
    buttons[2].querySelector('div').classList.add('game__background');
    buttons[2].querySelector('a').classList.add('game__button');
  }

  _setLoggedForm() {
    this._setEventLoggedForm();
    this._logoutButton();
    this._setFormRotate();
  }

  _setMainButtons() {
    this._setButtons(this._getButtons());
    this._setEventAppearanceControls();
    this._setActive(this._buttons[0].button);
  }

  _setEventAppearanceControls() {
    for (let i of this._buttons) {
      const button = i.button[1];

      button.onmouseover = event => {
        if (event.type === 'mouseover') {
          const activeButton = this._checkActiveButton();

          if (activeButton[0] !== i.button[0]) {
            this._setPassive(activeButton);
            this._setActive(i.button);

            if (i.button[0] === '2') {
              button.querySelector('a').style.marginLeft = '0px';
            }
          }
        }
      };
    }
  }

  _setPassive(button) {
    const background = button[1].querySelector('div');
    const text = button[1].querySelector('a');

    background.classList.remove('start__background');
    text.classList.remove('start__button');

    button[2] = false;
  }

  _setActive(button) {
    const background = button[1].querySelector('div');
    const text = button[1].querySelector('a');

    background.classList.add('start__background');
    text.classList.add('start__button');

    button[2] = true;
  }

  _checkActiveButton() {
    for (let button of this._buttons) {
      if (button.button[2]) {
        return button.button;
      }
    }
  }

  _setButtons(buttons) {
    this._buttons = [
      {
        button: [
          '1',
          buttons[0],
          false
        ]
      }, {
        button: [
          '2',
          buttons[1],
          false
        ]
      }, {
        button: [
          '3',
          buttons[2],
          false
        ]
      }
    ];
  }

  _setFormRotate() {
    const form = this.find('.wrapper__main__form');
    form.classList.add('wrapper__main__form__game-design');
  }

  _getBackground() {
    return new Image().render();
  }

  _chooseForm(state) {
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
    return document.getElementsByClassName('wrapper__main__form-wrapper');
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
      button.classList.remove('logout-off');
    }
  }

  _findLogoutButton() {
    return this._getButtons()[2];
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
          this.toDocument(this._createWrapperMain().render());
        } else {
          this._builtMain(viewService.getState());
        }

        viewService.hidePreLoader();
      });
  }
}

export default Main;
