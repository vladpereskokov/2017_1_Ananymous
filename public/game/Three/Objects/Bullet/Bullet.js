import threeFactory from '../../ThreeFactory/ThreeFactory';
import Objects from '../Objects/Objects';

export default class Bullet extends Objects {
  constructor() {
    super();

    this._initGeometry();
  }

  _setGeometry(settings) {
    this._geometry = threeFactory.sphereGeometry(0.000001, 1, 1);
  }

  _setMaterial() {
    this._material = threeFactory.meshBasicMaterial({
      color: 0x333333
    });
  }
}
