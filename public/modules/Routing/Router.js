import Route from './Route';

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

  use(pathname, view, options = {}) {
    const route = new Route(pathname, view, options);

    route.setRouter(this);
    this.routes.push(route);

    return this;
  }

  start() {
    window.onpopstate = (event => {
      this.onroute(window.location.pathname);
    }).bind(this);

    this.onroute(window.location.pathname);
  }

  onroute(pathname) {
    const route = this.routes.find(route => route.match(pathname));

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
    if (window.location.pathname === pathname) {
      return;
    }

    this.history.pushState({}, '', pathname);
    this.onroute(pathname);
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
}
