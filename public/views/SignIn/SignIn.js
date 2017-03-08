import Form from '../../components/Form/Form';
import View from '../../modules/View/View';

export default class SignIn extends View {
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
        fields: [
          {
            name: 'email',
            type: 'email',
            placeholder: 'Email address'
          }, {
            name: 'password1',
            type: 'password',
            placeholder: 'Password'
          }
        ],
        controls: [
          {
            type: 'button',
            text: 'Sign In',
            action: '/signin'
          }, {
            type: 'button',
            text: 'Back',
            action: this.showMain.bind(this)
          }
        ]
      }
    });
  }

  showMain() {
    this.getRouter().go('/');
  }
}
