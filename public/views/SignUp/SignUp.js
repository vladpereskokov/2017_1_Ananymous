import Form from '../../components/Form/Form';
import Block from '../../components/Block/Block';
import View from '../../modules/View/View';

const signUpForm = new Form({
  class: 'form z-depth-2'
}, [{
  element: 'h2',
  text: 'Sign Up',
  class: 'form-heading'
}, {
  element: 'label',
  text: 'Login',
  for: 'inputLogin',
  class: 'sr-only'
}, {
  element: 'input',
  type: 'text',
  id: 'inputLogin',
  class: 'form-control',
  placeholder: 'Login',
  required: true,
  autofocus: true
}, {
  element: 'label',
  text: 'Email address',
  for: 'inputEmail',
  class: 'sr-only'
}, {
  element: 'input',
  type: 'email',
  id: 'inputEmail',
  class: 'form-control',
  placeholder: 'Email address',
  required: true
}, {
  element: 'label',
  text: 'Password',
  for: 'inputPassword',
  class: 'sr-only'
}, {
  element: 'input',
  type: 'password',
  id: 'inputPassword',
  class: 'form-control',
  placeholder: 'Password',
  required: true
}, {
  element: 'label',
  text: 'RepeatPassword',
  for: 'inputRepeatPassword',
  class: 'sr-only'
}, {
  element: 'input',
  type: 'password',
  id: 'inputRepeatPassword',
  class: 'form-control',
  placeholder: 'Repeat Password',
  required: true
}, {
  element: 'button',
  id: 'submit',
  type: 'submit',
  class: 'btn btn-lg btn-primary btn-block',
  text: 'Sign Up'
}
]);

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
    const back = new Block('button', {
      id: 'submit',
      type: 'submit',
      class: 'btn btn-lg btn-primary btn-block',
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
