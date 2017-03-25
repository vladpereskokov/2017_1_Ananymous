import Route from './Route';
import viewService from '../../services/ViewService/ViewService';


export default class Router {
  constructor() {
    if (Router.__instance) {
      return Router.__instance;
    }

    this.routes = [];
    this.activeRoute = null;
    this.history = window.history;

    Router.__instance = this;
  }

  use(pathname, view) {
    const route = new Route(pathname, view);

    route.setRouter(this);
    this.routes.push(route);

    return this;
  }

  start() {
    window.onpopstate = (event => {
      this._onRoute(window.location.pathname);
    }).bind(this);

    viewService.setRouter(this);
    this._onRoute(window.location.pathname);
  }

  _onRoute(pathname) {
    const route = this.getRoute(pathname);

    if (!route) {
      return;
    }

    if (this.activeRoute) {
      this.activeRoute.leave();
    }

    this.activeRoute = route;
    this.activeRoute.navigate(pathname);
  }

  go(pathname) {
    if (window.location.pathname === pathname && pathname !== '/signin') {
      return;
    }

    this.history.pushState({}, '', pathname);
    this._onRoute(pathname);
  }

  setHistory(history) {
    this.history = history;
  }

  back() {
    this.history.back();
  }

  forward() {
    this.history.forward();
  }

  getRoute(pathname) {
    return this.routes.find(route => route.match(pathname));
  }
}
