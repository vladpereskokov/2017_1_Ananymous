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

  boxGeometry(...settings) {
    const [width, height, depth,
      widthSegments, heightSegments, depthSegments] = settings;

    return new this._three.BoxGeometry(width, height, depth,
      widthSegments, heightSegments, depthSegments);
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

  meshPhongMaterial(object) {
    return new this._three.MeshPhongMaterial(object);
  }

  get flatShading() {
    return this._three.FlatShading;
  }

  perspectiveCamera(...settings) {
    const [fov, aspect, near, far] = settings;

    return new this._three.PerspectiveCamera(fov, aspect, near, far);
  }

  scene() {
    return new this._three.Scene();
  }

  fog(...settings) {
    const [hex, near, far] = settings;

    return new this._three.Fog(hex, near, far);
  }

  hemisphereLight(...settings) {
    const [skyColor, groundColor, intensity] = settings;

    return new this._three.HemisphereLight(skyColor, groundColor, intensity);
  }

  raycaster(...settings) {
    const [origin, direction, near, far] = settings;

    return new this._three.Raycaster(origin, direction, near, far);
  }

  webGLRender() {
    return new this._three.WebGLRenderer();
  }
}

const threeFactory = new ThreeFactory();

export default threeFactory;
