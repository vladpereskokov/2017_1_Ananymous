import Form from '../../../components/Form/Form';
import Block from '../../../components/Block/Block';

import '../Registration.scss';

class SignUp extends Block {
  constructor() {
    super('div', {
      class: 'registration'
    });
  }

  init() {
    const form = this._createForm();
    form.renderTo(this._getElement());

    const top = new Block('div', {
      class: 'registration__back'
    });

    const common = new Block('div', {
      class: 'common'
    });

    top.appendTo(common.render());
    this.appendTo(common.render());


    document.body.querySelector('.wrapper__main').insertBefore(common.render(),
      document.body.querySelector('.wrapper__main__wrapper'));
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
