import threeFactory from '../../Three/ThreeFactory/ThreeFactory';

export default class BulletService {
  constructor(bulletObject, owner) {
    this._bulletObject = bulletObject;
    this._owner = owner;

    this._createBullet();
  }

  _createBullet() {
    this._bulletObject.position.set(
      this._owner.position.x,
      this._owner.position.y * 0.8,
      this._owner.position.z
    );

    this._bulletObject.ray = threeFactory.ray(
      this._owner.position,
      this._getVectorBullet().sub(this._owner.position).normalize()
    );
  }

  _getVectorBullet() {
    let vector = null;

    if (this._owner instanceof threeFactory._three.Camera) {
      vector = threeFactory.vector3D(0, 0, 1);
      vector.unproject(this._owner);
    }
    else {
      vector = this._owner.position.clone();
    }

    return vector;
  }

  get owner() {
    return this._owner;
  }

  get object() {
    return this._bulletObject;
  }
}
