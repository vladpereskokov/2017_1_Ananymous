import Form from '../../components/Form/Form';
import Button from '../../components/Button/Button';
import View from '../../modules/View/View';

const signUpForm = new Form([{
  element: 'title',
  text: 'Sign Up',
}, {
  element: 'input',
  type: 'text',
  placeholder: 'Login',
  autofocus: true
}, {
  element: 'input',
  type: 'email',
  placeholder: 'Email address'
}, {
  element: 'input',
  type: 'password',
  placeholder: 'Password',
  required: true
}, {
  element: 'input',
  type: 'password',
  placeholder: 'Repeat Password',
  required: true
}, {
  element: 'button',
  type: 'submit',
  text: 'Sign Up'
}]);

class SignUp extends View {
  constructor() {
    super();
  }

  init(options = {}) {
    this._changeForm();
    signUpForm.renderTo(this._el);
    document.body.appendChild(this._el);
  }

  _changeForm() {
    signUpForm.append(this._backButton().render());
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

export default SignUp;
