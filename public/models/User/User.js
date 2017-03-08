export default class User {
  constructor() {
    this._id = null;
    this._login = null;
  }

  get getUser() {
    return {
      id: this._id,
      login: this._login
    };
  }

  get getLogin() {
    return this._login;
  }

  get getId() {
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
