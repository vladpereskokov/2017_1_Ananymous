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
  class: 'sr-only'
}, {
  element: 'input',
  type: 'text',
  class: 'form-control',
  placeholder: 'Login',
  autofocus: true
}, {
  element: 'label',
  text: 'Email address',
  class: 'sr-only'
}, {
  element: 'input',
  type: 'email',
  class: 'form-control',
  placeholder: 'Email address'
}, {
  element: 'label',
  text: 'Password',
  class: 'sr-only'
}, {
  element: 'input',
  type: 'password',
  class: 'form-control',
  placeholder: 'Password',
  required: true
}, {
  element: 'label',
  text: 'RepeatPassword',
  class: 'sr-only'
}, {
  element: 'input',
  type: 'password',
  class: 'form-control',
  placeholder: 'Repeat Password',
  required: true
}, {
  element: 'button',
  type: 'submit',
  class: 'btn btn-lg btn-primary btn-block',
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
