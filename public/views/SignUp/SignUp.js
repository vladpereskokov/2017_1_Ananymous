import Form from '../../components/Form/Form';
import Block from "../../components/Block/Block";


class SignUp extends Block {
  constructor() {
    super();
  }

  init() {
    const form = this._createForm();
    form.renderTo(this._getElement());
    document.body.appendChild(this._getElement());
  }

  _createForm() {
    return new Form({
      data: {
        title: 'Sign Up',
        fields: [{
          name: 'login',
          type: 'text',
          placeholder: 'Login'
        }, {
          name: 'email',
          type: 'email',
          placeholder: 'Email address'
        }, {
          name: 'password1',
          type: 'password',
          placeholder: 'Password'
        }, {
          name: 'password2',
          type: 'password',
          placeholder: 'Repeat Password'
        }
        ],
        controls: [{
          text: 'Sign Up',
          action: '/signup'
        }, {
          text: 'Back',
          action: this.showMain.bind(this)
        }]
      }
    });
  }

  showMain() {
    this.getRouter().go('/');
  }
}

export default SignUp;
