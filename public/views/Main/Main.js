import View from '../../modules/View/View';

import './Main.scss';
import template from './Main.tmpl.xml';

const isLogged = false;

const notLogged = {
  buttons: [{
    text: 'Sign Up',
    action: '/signup'
  }, {
    text: 'Sign In',
    action: '/signin'
  }, {
    text: 'Scoreboard',
    action: '/scoreboard'
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
    this._el.innerHTML = template(isLogged ? logged : notLogged);
  }
}

export default Main;
