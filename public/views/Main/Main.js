import View from '../../modules/View/View';
import transport from '../../modules/Transport/Transport';
import userService from '../../services/UserService/UserService';

import './Main.scss';
import template from './Main.tmpl.xml';

class Main extends View {
  constructor() {
    super();
  }

  init(options = {}) {
    this._getRequestIsLogin();
  }

  _makeMain(state = false) {
    this._el.innerHTML = template(this._changeForm(state));
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
      this._postRequestLogout();
      userService.setState(false);
      this.show();
    }
  }

  _postRequestLogout() {
    transport.post('/logout', JSON.stringify({ 'name': 'top' }))
      .then(response => {
        if (+response.status === 200) {
          userService.setState(false);
        }
      })
      .catch(error => {
        console.log(error);
      });
  }

  _getRequestIsLogin() {
    transport.get('/cur-user')
      .then(response => {
        if (+response.status === 200) {
          userService.setState(true);
        }
        const state = userService.getState();

        this._makeMain(state);

        document.body.appendChild(this._el);

        if (state) {
          this._logoutButton();
        }
      })
      .catch(error => {
        console.log(error);
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
