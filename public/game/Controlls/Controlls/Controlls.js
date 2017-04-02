export default class Controlls {
  constructor() {
  }

  onKeyDown(buttons, velocity) {
    return (event) => {
      this._setKeyDown(buttons, event.keyCode, velocity);
    }
  }

  onKeyUp(buttons) {
    return (event) => {
      this._setKeyUp(buttons, event.keyCode);
    }
  }

  _setKeyDown(buttons, code, velocity) {
    switch (code) {
      case 38: // up
      case 87: // w
        buttons.forward = true;
        break;
      case 37: // left
      case 65: // a
        buttons.left = true; break;
      case 40: // down
      case 83: // s
        buttons.backward = true;
        break;
      case 39: // right
      case 68: // d
        buttons.right = true;
        break;
      case 32: // space
        if (buttons.jump === true) {
          velocity.y += 350;
        }
        buttons.jump = false;
        break;

      default:
        break;
    }
  }

  _setKeyUp(buttons, code) {
    switch(code) {
      case 38: // up
      case 87: // w
        buttons.forward = false;
        break;
      case 37: // left
      case 65: // a
        buttons.left = false;
        break;
      case 40: // down
      case 83: // s
        buttons.backward = false;
        break;
      case 39: // right
      case 68: // d
        buttons.right = false;
        break;

      default:
        break;
    }
  }
}
