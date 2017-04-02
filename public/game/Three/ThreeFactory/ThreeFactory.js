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

  planeGeometry(...settings) {
    const [width, height, widthSegments, heightSegments] = settings;

    return new this._three
      .PlaneGeometry(width, height, widthSegments, heightSegments);
  }

  color(color = null) {
    return new this._three.Color(color);
  }

  meshBasicMaterial(object) {
    return new this._three.MeshBasicMaterial(object);
  }

  get vertexColors() {
    return this._three.VertexColors;
  }

  mesh(geometry, material) {
    return new this._three.Mesh(geometry, material);
  }
}

const threeFactory = new ThreeFactory();

export default threeFactory;
