class ViewService {
  constructor() {
    if (ViewService.__instance) {
      return ViewService.__instance;
    }

    ViewService.__instance = this;
  }

  setRouter(router) {
    this._router = router;
  }

  getViewByRoute(pathname) {
    return this._router.getRoute(pathname).getView();
  }

  go(url) {
    this._router.go(url);
  }
}

const viewService = new ViewService();

export default viewService;
