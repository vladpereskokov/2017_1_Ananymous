import View from '../../modules/View/View';
import userService from '../../services/UserService/UserService';

import './Main.scss';
import template from './Main.tmpl.xml';

class Main extends View {
  constructor() {
    super();
  }

  init(options = {}) {
    userService.isLogin()
      .then(response => {
        if (+response.status === 200) {
          userService.setState(true);
        }

        this.show();
      });
  }

  _makeMain(state) {
    this._el.innerHTML = template(this._changeForm(state));
    document.body.appendChild(this._el);

    if (state) {
      this._logoutButton();
    }
  }

  _changeForm(state) {
    return state ? this._getLoggedForm() : this._getUnLoggedForm();
  }

  logout() {
    const state = userService.getState();

    if (state) {
      userService.logout()
        .then(state => {
          userService.setState(state);
          this.show();
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
        text: 'Sign Up',
        action: '/signup'
      }, {
        text: 'Sign In',
        action: '/signin'
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

  show() {
    const state = userService.getState();

    this._makeMain(state);
    this._el.style.display = 'block';
  }

}

export default Main;
