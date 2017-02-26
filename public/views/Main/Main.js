import View from '../../modules/View/View';

import './Main.scss';
import template from './Main.tmpl.xml';

class Main extends View {
  constructor() {
    super();
  }

  init(options = {}) {
    // this._el.appendChild(this._mainPage().render());
    this._createMain();
    document.body.appendChild(this._el);
  }

  _createMain() {
    this._el.innerHTML = template({
      buttons: [{
        text: 'Sign Up',
        action: "alert('hello')",
      }, {
        text: 'Sign In',
        action: this.showSignIn.bind(this),
      }, {
        text: 'Scoreboard',
        action: this.showScoreboard.bind(this),
      }],
    });
  }

  showSignIn() {
    this.getRouter().go('/SignIn');
  }

  showSignUp() {
    this.getRouter().go('/SignUp');
  }

  showScoreboard() {
    this.getRouter().go('/Scoreboard');
  }
}

export default Main;