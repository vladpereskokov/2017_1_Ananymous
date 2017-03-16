import Form from '../../../components/Form/Form';
import Block from '../../../components/Block/Block';

import '../Registration.scss';

export default class SignIn extends Block {
  constructor() {
    super('div', {
      class: 'registration'
    });
  }

  init(options = {}) {
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
