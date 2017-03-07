import View from '../../modules/View/View';

import './Main.scss';
import template from './Main.tmpl.xml';

const isLogged = false;

const notLogged = {
  buttons: [{
    text: 'Sign Up',
    action: '/SignUp'
  }, {
    text: 'Sign In',
    action: '/SignIn'
  }, {
    text: 'Scoreboard',
    action: '/Scoreboard'
  }]
};

const logged = {
  buttons: [{
    text: 'Game',
    action: '/Game'
  }, {
    text: 'Scoreboard',
    action: '/Scoreboard'
  }, {
    text: 'Logout',
    action: '/Logout'
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
    this._el.innerHTML = template(isLogged === true ? logged : notLogged);
  }
}

export default Main;
