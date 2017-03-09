import View from '../../modules/View/View';
import Transport from '../../modules/Transport/Transport';
import userService from '../../services/UserService/UserService';

export default class Logout extends View {
  constructor() {
    super();
  }

  init(options = {}) {
    this._http = new Transport();
    this._http._baseUrl = 'https://ananymous.herokuapp.com/api';

    this._logout();

    document.body.appendChild(this._el);
  }

  _logout() {
    this._http.post('/logout')
      .then(response => {
        console.log(response);
        +response.status === 200 ? userService.setState(true) :
          userService.setState(false);
      });
  }

  showMain() {
    this.getRouter().go('/');
  }
}
