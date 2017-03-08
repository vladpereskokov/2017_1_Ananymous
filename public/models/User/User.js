export default class User {
  constructor() {
    this._id = null;
    this._login = null;
    this._state = false;
  }

  get getUser() {
    return this._state ? {
      id: this._id,
      login: this._login
    } : null;
  }

  get getLogin() {
    return this._login;
  }

  get getId() {
    return this._id;
  }

  get getState() {
    return this._state;
  }

  setUser(user = {}) {
    this.setLogin(user.login);
    this.setId(user.id);
    this.setState(user.login !== null);
  }

  setState(state) {
    this._state = state;
  }

  setLogin(login) {
    this._login = login;
  }

  setId(id) {
    this._id = id;
  }
}
