import Block from '../../components/Block/Block';
import viewService from '../../services/ViewService/ViewService';
import mainViewService from '../../services/MainViewService/MainViewService';
import preLoader from '../PreLoader/PreLoader';
import FullScreen from "../../modules/FullScreen/FullScreen";

import './Main.scss';
import template from './Main.tmpl.xml';

export default class Main extends Block {
  constructor() {
    super('div', {
      class: 'wrapper'
    });

    this._currentView = null;
    this.toDocument(preLoader.render());
  }

  init() {
    this._builtBase(template());
    this.toDocument(this.render());
  }

  hide() {
  }

  show() {
    viewService.showPreLoader();

    this._getDocument().querySelector('.wrapper').style.display = 'block';

    viewService.isLogin()
      .then(response => {
        return {
          status: +response.status === 200,
          json: response.json()
        }
      })
      .then(data => {
        data.json
          .then(user => {
            if (!user.message) {
              viewService.setUser({
                login: user.login,
                email: user.email
              });
            }

            viewService.setState(data.status);
            this._changeView();

            viewService.hidePreLoader();
          });

      });
  }

  _changeView() {
    const newView = mainViewService.getMainForm();

    if (!this._currentView || newView._buttons.length !== this._currentView._buttons.length) {
      if (this._currentView) {
        this._currentView.hide();
      }

      this._currentView = newView;
      this._getElement().querySelector('.wrapper__main__wrapper').appendChild(this._currentView.render());
    }
  }

  _builtBase(template) {
    this._getElement().innerHTML = template;
  }
}
