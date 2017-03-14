import isPath from '../OtherScripts/isPath/isPath';

export default class Route {
  constructor(pathname, view) {
    this._pathname = pathname;
    this.ViewType = view;
    this._view = null;
  }

  navigate(pathname) {
    if (this.match(pathname)) {
      if (!this._view) {
        const view = new this.ViewType();

        view.init();
        view.setRouter(this.__router);

        this._view = view;
      }

      this._view.resume();
    }
  }

  leave() {
    this._view && this._view.pause();
  }

  setRouter(router) {
    this.__router = router;
  }

  match(pathname) {
    return isPath(pathname, this._pathname);
  }
}
