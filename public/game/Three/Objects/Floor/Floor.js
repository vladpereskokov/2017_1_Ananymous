import threeFactory from '../../ThreeFactory/ThreeFactory';

export default class Floor {
  constructor() {
    this._geometry = threeFactory.planeGeometry(2000, 2000, 100, 100);

    this._initGeometry();
  }

  get getFloor() {
    return this._mesh;
  }

  _initGeometry() {
    this._geometry.rotateX(-Math.PI / 2);

    this._createObject();
  }

  _createObject() {
    this._setupVertices();
    this._setupFaces();
    this._setMaterial();
  }

  _setupVertices() {
    for (let vertex of this._geometry.vertices) {
      vertex.x += Math.random() * 20 - 10;
      vertex.y += Math.random() * 2;
      vertex.z += Math.random() * 20 - 10;
    }
  }

  _setupFaces() {
    for (let face of this._geometry.faces) {
      face.vertexColors[0] = threeFactory.color().setHSL(0.4, 0.75, 0.5);
      face.vertexColors[1] = threeFactory.color().setHSL(0.4, 0.75, 0.5);
      face.vertexColors[2] = threeFactory.color().setHSL(0.4, 0.75, 0.5);
    }
  }

  _setMaterial() {
    this._material = threeFactory.meshBasicMaterial({
      vertexColors: threeFactory.vertexColors
    });

    this._mesh = threeFactory.mesh(this._geometry, this._material);
  }
}
