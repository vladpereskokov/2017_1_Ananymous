class ViewService {
  constructor() {
    if (ViewService.__instance) {
      return ViewService.__instance;
    }

    ViewService.__instance = this;
    this._currentRoute = null;
    this._previousRoute = null;
  }

  changeRoute(route, pathname) {
    this._previousRoute = this._currentRoute;
    this._currentRoute = route;
    console.log(route);
    console.log(this._currentRoute);

    if (this._previousRoute) {
      this.hideRoute(this._previousRoute);
    }

    this.showRoute(this._currentRoute, pathname);
  }

  showRoute(view, pathname) {
    view.navigate(pathname);
  }

  hideRoute(view) {
    view.leave();
  }

  go(url) {
    console.log(this._currentRoute);
    this._currentRoute._getRouter().go(url);
  }
}

const viewService = new ViewService();

export default viewService;
