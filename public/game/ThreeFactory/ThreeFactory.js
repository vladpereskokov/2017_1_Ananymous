class ThreeFactory {
  constructor() {
    if (ThreeFactory.__instance) {
      return ThreeFactory.__instance;
    }

    ThreeFactory.__instance = this;
    this._three = THREE;
  }

  object3D() {
    return new this._three.Object3D();
  }

  vector3D(...coords) {
    const [x, y, z] = coords;

    return new this._three.Vector3(x, y, z);
  }

  euler(systemOfAxes, ...coords) {
    const [x, y, z] = coords;

    return new this._three.Euler(x, y, z, systemOfAxes);
  }
}

const threeFactory = new ThreeFactory();

export default threeFactory;
