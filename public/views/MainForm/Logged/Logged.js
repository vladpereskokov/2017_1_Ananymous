import MainForm from '../MainForm/MainForm';
import viewService from '../../../services/ViewService/ViewService';

import './Logged.scss';
import template from './Logged.tmpl.xml';

export default class Logged extends MainForm {
  constructor() {
    super();

    this._getElement().classList.remove('wrapper__main__form');
    this.addClass('main__form-logged');
  }

  init() {
    this._setUrls(['/game', '/scoreboard', '/about']);

    this._getElement().innerHTML = template({
      buttons: [{
        text: 'GAME'
      }, {
        text: 'SCOREBOARD'
      }, {
        text: 'ABOUT'
      }],
      username: viewService.getUser().login
    });

    this._setMainButtons();
    this._setGameButton();
    this._activateButtons();
    this._setLogoutButton();
  }

  _setGameButton() {
    this._getButton(0)
      .addEventListener('click', (event) => {
        event.preventDefault();
        this._game();
      });
  }

  _game() {
    this._hideAll();
    viewService.go('/game');
  }

  _hideAll() {
    this._getDocument().querySelector('.wrapper').style.display = 'none';
  }

  _setLogoutButton() {
    this._getButton(3)
      .addEventListener('click', (event) => {
        this._logout();
      });
  }

  _logout() {
    viewService.showPreLoader();

    viewService.logout()
      .then(() => {
        viewService.go('/');
        viewService.hidePreLoader();
      });
  }

  _getButton(number) {
    return this._buttons[number].button;
  }
}
