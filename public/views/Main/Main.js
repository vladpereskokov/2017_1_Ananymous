import View from '../../modules/View/View';

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
    this._createMain();
    document.body.appendChild(this._el);
  }

  _createMain() {
    this._el.innerHTML = template(this._changeForm(window.isLogged));
  }

  _changeForm(check) {
    return check ? logged : notLogged;
  }

}

export default Main;
