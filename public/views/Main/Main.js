import View from '../../modules/View/View';

import './Main.scss';
import template from './Main.tmpl.xml';

class Main extends View {
  constructor() {
    super();
  }

  init(options = {}) {
    this._createMain();
    document.body.appendChild(this._el);
  }

  _createMain() {
    this._el.innerHTML = template({
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
    });
  }
}

export default Main;
