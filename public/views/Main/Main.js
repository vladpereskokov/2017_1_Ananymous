import Block from '../../components/Block/Block';
import View from '../../modules/View/View';

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
    const mainForm = new Block('div', { class: 'form z-depth-2' });
    const signUpButton = Main._createButton('SignUp', 'Sign Up');
    const signInButton = Main._createButton('SignIn', 'Sign In');
    const scoreboard = Main._createButton('Scoreboard', 'Scoreboard');

    signUpButton.start('click', this.showSignUp.bind(this));
    signInButton.start('click', this.showSignIn.bind(this));
    scoreboard.start('click', this.showScoreboard.bind(this));

    mainForm.append(signUpButton.render());
    mainForm.append(signInButton.render());
    mainForm.append(scoreboard.render());

    return mainForm;
  }

  static _createButton(elementId, elementText) {
    return new Block('button', {
      class: 'btn btn-lg btn-primary btn-block',
      id: elementId,
      text: elementText,
    });
  }
}

export default Main;
