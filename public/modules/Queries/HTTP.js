import 'whatwg-fetch';

export default class HTTP {
  constructor() {
    if (HTTP.__instance) {
      return HTTP.__instance;
    }

    this._headers = {};
    this._baseUrl = '';

    HTTP.__instance = this;
  }

  get Headers() {
    return this._headers;
  }

  set Headers(value) {
    if (!(value && (`${value}` === '[object Object]'))) {
      throw new TypeError('Headers must be a plain object');
    }
    const valid = Object.keys(value).every(key => typeof value[key] === 'string');
    if (!valid) {
      throw new TypeError('Headers must be a plain object');
    }
    this._headers = value;
  }

  get(uri, query = null, callback = null) {
    this._sender(uri, 'GET', callback);
  }

  _sender(uri, _method, callback = null,
          _headers = { 'Content-Type': 'application/json; charset=utf-8' },
          coockies = 'include') {
    fetch(this._baseUrl + uri, {
      method: _method,
      mode: 'cors',
      headers: _headers,
      credentials: coockies
    })
      .then(response => {
        if (typeof callback === 'function') {
          callback(response);
        }
      })
      .catch(error => console.log('Request failed', error));
  }
}
