import Block from '../../components/Block/Block';
import Button from '../../components/Button/Button';
import View from '../../modules/View/View';

import './Main.scss';

class Main extends View {
  constructor() {
    super();
  }

  init(options = {}) {
    this._el.appendChild(this._mainPage().render());
    document.body.appendChild(this._el);
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

  _mainPage() {
    const mainForm = new Block('div', { class: 'main z-depth-2' });
    const signUpButton = this._createButton('Sign Up');
    const signInButton = this._createButton('Sign In');
    const scoreboard = this._createButton('Scoreboard');

    signUpButton.start('click', this.showSignUp.bind(this));
    signInButton.start('click', this.showSignIn.bind(this));
    scoreboard.start('click', this.showScoreboard.bind(this));

    mainForm.append(signUpButton.render());
    mainForm.append(signInButton.render());
    mainForm.append(scoreboard.render());

    return mainForm;
  }

  _createButton(elementText) {
    return new Button({
      text: elementText,
    });
  }
}

export default Main;
