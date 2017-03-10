import User from '../../models/User/User';

class UserService {
  constructor() {
    if (UserService.__instance) {
      return UserService.__instance;
    }

    this._user = new User();
    this._state = false;

    UserService.__instance = this;
  }

  getData() {
    return this._user.getUser;
  }

  getState() {
    return this._state;
  }

  setData(data) {
    this._user.setUser(data);
  }

  setState(state) {
    this._state = state;
  }
}

const userService = new UserService();

export default userService;
