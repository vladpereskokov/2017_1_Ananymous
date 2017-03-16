import Form from '../../components/Form/Form';
import Block from "../../components/Block/Block";


export default class SignIn extends Block {
  constructor() {
    super();
  }

  init(options = {}) {
    const form = this._createForm();
    form.renderTo(this._getElement());
    document.body.appendChild(this._getElement());

  }

  getForm() {
    return this._getElement();
  }

  _createForm() {
    return new Form({
      data: {
        title: 'Sign In',
        fields: [{
          title: 'Login',
          name: 'email',
          type: 'email',
          placeholder: 'Email address'
        }, {
          title: 'Password',
          name: 'password1',
          type: 'password',
          placeholder: 'Password'
        }
        ],
        controls: [{
          text: 'Sign In',
          action: '/signin'
        }]
      }
    });
  }

  showMain() {
    this.getRouter().go('/');
  }
}
