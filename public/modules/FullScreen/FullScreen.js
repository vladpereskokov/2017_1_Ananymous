export default class FullScreen {
  constructor() {
    this._isFull = false;
  }

  toggle(element) {
    console.log(element);
    this._isFull ? this.off(element) : this.on(element);
  }

  on(element) {
    element.webkitRequestFullscreen();
  }

  off(element) {
    element.webkitRequestFullscreen();
  }
}
