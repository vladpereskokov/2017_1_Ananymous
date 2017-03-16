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
          title: 'Login',
          name: 'login',
          type: 'text',
          placeholder: 'Login'
        }, {
          title: 'Email',
          name: 'email',
          type: 'email',
          placeholder: 'Email address'
        }, {
          title: 'Password',
          name: 'password1',
          type: 'password',
          placeholder: 'Password'
        }, {
          title: 'Repeat password',
          name: 'password2',
          type: 'password',
          placeholder: 'Repeat Password'
        }
        ],
        controls: [{
          text: 'Sign Up',
          action: '/signup'
        }]
      }
    });
  }

  showMain() {
    this.getRouter().go('/');
  }
}

export default SignUp;
