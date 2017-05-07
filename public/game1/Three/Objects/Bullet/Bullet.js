import threeFactory from '../../ThreeFactory/ThreeFactory';

export default class Bullet {
  constructor(color, ...settings) {
    const [radius, width, height] = settings;

    this._geometry = threeFactory.sphereGeometry(radius, width, height);

    this._init(color);
  }

  get getBullet() {
    return threeFactory.mesh(this._geometry, this._material)
  }

  _init(color) {
    this._setupMaterial(color);
  }

  _setupMaterial(color) {
    this._material = threeFactory.meshBasicMaterial({
      color: color
    });
  }
}
