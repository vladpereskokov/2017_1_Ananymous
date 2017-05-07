import threeFactory from '../../ThreeFactory/ThreeFactory';

export default class Walls {
  constructor(color = 0xffffff, ...settings) {
    const [a, b, c, d, e, f] = settings;

    this._geometry = threeFactory.cubeGeometry(a, b, c, d, e, f);

    this._initGeometry(color);
  }

  get getBox() {

    // return new threeFactory.mesh();
  }

  _initGeometry(color) {
    this._createObject(color);
  }

  _createObject(color) {
    this._setupFaces(color);
    this._setMaterial(color);
  }

  _setupFaces(color) {
    for (let face of this._geometry.faces) {
      face.vertexColors[0] = threeFactory.color(color);
      face.vertexColors[1] = threeFactory.color(color);
      face.vertexColors[2] = threeFactory.color(color);
    }
  }

  _setMaterial(color) {
    this._material = threeFactory.meshPhongMaterial({
      specular: 0xffffff,
      shading: threeFactory.flatShading,
      vertexColors: threeFactory.vertexColors
    });

    this._material.color.setHex(color);
  }
}
