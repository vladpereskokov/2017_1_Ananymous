export default class Mouse {
  constructor() {
    this._x = 0;
    this._y = 0;
    this._PI_2 = Math.PI / 2;
    this._enabled = false;
  }

  set setEnabled(enabled) {
    this._enabled = enabled;
  }

  get getEnabled() {
    return this._enabled;
  }

  onMouseMove(pitch, yaw) {
    return (event) => {
      if (!this._enabled) {
        return;
      }

      this._x = event.movementX || event.mozMovementX || event.webkitMovementX || 0;
      this._y = event.movementY || event.mozMovementY || event.webkitMovementY || 0;

      yaw.rotation.y -= this._x * 0.002;
      pitch.rotation.x -= this._y * 0.002;

      pitch.rotation.x = Math.max(-this._PI_2,
        Math.min(this._PI_2, pitch.rotation.x));
    };
  }
}