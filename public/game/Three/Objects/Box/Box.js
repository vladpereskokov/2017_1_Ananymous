import threeFactory from '../../ThreeFactory/ThreeFactory';

export default class Box {
  constructor(color = 0xffffff, ...settings) {
    const [width, height, depth,
      widthSegments, heightSegments, depthSegments] = settings;

    this._geometry = threeFactory.boxGeometry(width, height, depth,
      widthSegments, heightSegments, depthSegments);

    this._initGeometry(color);
  }

  get getBox() {
    return threeFactory.mesh(this._geometry, this._material);
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
