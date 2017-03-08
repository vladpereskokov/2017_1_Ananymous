export default class User {
  constructor() {
    this._id = null;
    this._login = null;
  }

  getUser() {
    return {
      id: this._id,
      login: this._login
    };
  }

  getLogin() {
    return this._login;
  }

  getId() {
    return this._id;
  }

  setUser(user = {}) {
    this.setLogin(user.login);
    this.setId(user.id);
  }

  setLogin(login) {
    this._login = login;
  }

  setId(id) {
    this._id = id;
  }
}
