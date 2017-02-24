import Form from '../../components/Form/Form';
import Button from '../../components/Button/Button';
import View from '../../modules/View/View';

const signInForm = new Form([{
  element: 'title',
  text: 'Sign In',
}, {
  element: 'input',
  type: 'email',
  placeholder: 'Email address',
  autofocus: true
}, {
  element: 'input',
  type: 'password',
  placeholder: 'Password'
}, {
  element: 'button',
  type: 'submit',
  text: 'Sign In'
}]);

export default class SignIn extends View {
  constructor() {
    super();
  }

  init(options = {}) {
    this._changeForm();
    signInForm.renderTo(this._el);
    document.body.appendChild(this._el);
  }

  _changeForm() {
    signInForm.append(this._backButton().render());
  }

  _backButton() {
    const back = new Button({
      type: 'submit',
      text: 'Back'
    });

    back.start('click', this.showMain.bind(this));

    return back;
  }

  showMain() {
    this.getRouter().go('/');
  }
}
