import FormView from '../FormView/FormView';
import Form from "../../../components/Form/Form";

import '../FormView/FormView.scss';

export default class SignUp extends FormView {
  constructor() {
    super(new Form({
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
        }, {
          text: 'Back',
          action: '/'
        }]
      }
    }));
  }
}
