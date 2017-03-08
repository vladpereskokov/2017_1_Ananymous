import View from '../../modules/View/View';
import userService from '../../services/UserService/UserService';

import './Main.scss';
import template from './Main.tmpl.xml';

window.isLogged = false;

const notLogged = {
  buttons: [{
    text: 'Sign Up',
    action: '/signup'
  }, {
    text: 'Sign In',
    action: '/signin'
  }]
};

const logged = {
  buttons: [{
    text: 'Game',
    action: '/game'
  }, {
    text: 'Scoreboard',
    action: '/scoreboard'
  }, {
    text: 'Logout',
    action: '/logout'
  }]
};

class Main extends View {
  constructor() {
    super();
  }

  init(options = {}) {
    this._makeMain();
    document.body.appendChild(this._el);
  }

  _makeMain(state = false) {
    this._el.innerHTML = template(this._changeForm(state));
  }

  _changeForm(state) {
    return state ? logged : notLogged;
  }

  show() {
    const state = userService.getState();

    this._makeMain(state);
    this._el.style.display = 'block';
  }

}

export default Main;
