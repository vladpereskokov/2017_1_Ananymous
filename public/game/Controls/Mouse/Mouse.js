export default class Mouse {
  constructor() {
    this.mouseX = 0;
    this.mouseY = 0;

    this.viewHalfX = window.innerWidth / 2;
    this.viewHalfY = window.innerHeight / 2;
  }

  onMouseMove() {
    return event => {
      this.mouseX = event.pageX - this.viewHalfX;
      this.mouseY = event.pageY - this.viewHalfY;
    }
  }

  onClickMouse(callback) {
    return event => {
      event.preventDefault();
      if (event.which === 1) {
        callback();
      }
    }
  }
}
