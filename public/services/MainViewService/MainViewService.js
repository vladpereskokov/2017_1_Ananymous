import viewService from '../ViewService/ViewService';
import Logged from '../../views/MainForm/Logged/Logged';
import UnLogged from '../../views/MainForm/UnLogged/UnLogged';

class MainViewService {
  constructor() {
    if (MainViewService.__instance) {
      return MainViewService.__instance;
    }

    MainViewService.__instance = this;
    this._loggedForm = new Logged();
    this._unLoggedForm = new UnLogged();
  }

  getMainForm() {
    return this._getState() ? this._loggedForm : this._unLoggedForm;
  }

  _getState() {
    return viewService.getState();
  }
}

const mainViewService = new MainViewService();

export default mainViewService;
