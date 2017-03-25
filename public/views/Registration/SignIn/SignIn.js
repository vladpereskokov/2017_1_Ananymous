import FormView from '../FormView/FormView';
import Form from '../../../components/Form/Form';

import '../FormView/FormView.scss';

export default class SignIn extends FormView {
  constructor() {
    super(new Form({
      data: {
        title: 'Sign In',
        fields: [{
          title: 'Login',
          name: 'login',
          type: 'text',
          placeholder: 'Login'
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
        }, {
          text: 'Back'
        }]
      }
    }));
  }
}
