import Form from '../../components/Form/Form';
import View from '../../modules/View/View';

class SignUp extends View {
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
            text: 'Sign Un',
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
