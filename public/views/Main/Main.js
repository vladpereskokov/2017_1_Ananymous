import Block from "../../components/Block/Block";
import userService from '../../services/UserService/UserService';

import './Main.scss';
import template from './Main.tmpl.xml';

class Main extends Block {
  constructor() {
    super();
  }

  _makeMain(state) {
    this._getElement().innerHTML = template(this._changeForm(state));
    document.body.appendChild(this._getElement());
    this._getElement().style.height = '100%';

    if (state) {
      this._logoutButton();
    }
  }

  _changeForm(state) {
    return state ? this._getLoggedForm() : this._getUnLoggedForm();
  }

  logout() {
    if (userService.getState()) {
      userService.logout()
        .then(state => {
          userService.setState(!state);
          this.resume();
        });
    }
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
        text: 'Register',
        action: '/signup'
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

  _createMain() {
    const state = userService.getState();

    this._makeMain(state);
    this.show();
  }

  resume() {
    userService.isLogin()
      .then(response => {
        if (+response.status === 200) {
          userService.setState(true);
        }

        this._createMain();
      });
  }
}

export default Main;
