export default class Player {
  constructor(height, speed, turnSpeed, canShoot) {
    this._height = height;
    this._speed = speed;
    this._turnSpeed = turnSpeed;
    this._canShoot = canShoot;
  }

  get getHeight() {
    return this._height;
  }

  get getObject() {
    return {
      height: this._height,
      speed: this._speed,
      turnSpeed: this._turnSpeed,
      canShoot: this._canShoot
    };
  }
}
