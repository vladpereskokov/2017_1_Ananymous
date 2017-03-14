import Form from '../../components/Form/Form';
import Block from "../../components/Block/Block";


export default class SignIn extends Block {
  constructor() {
    super();
  }

  init(options = {}) {
    const form = this._createForm();
    form.renderTo(this._el);
    document.body.appendChild(this._el);
  }

  _createForm() {
    return new Form({
      data: {
        title: 'Sign In',
        fields: [{
          name: 'email',
          type: 'email',
          placeholder: 'Email address'
        }, {
          name: 'password1',
          type: 'password',
          placeholder: 'Password'
        }
        ],
        controls: [{
          text: 'Sign In',
          action: '/signin'
        }, {
          text: 'Back',
          action: this.showRegister.bind(this)
        }]
      }
    });
  }

  showRegister() {
    this.getRouter().go('/signup');
  }
}
