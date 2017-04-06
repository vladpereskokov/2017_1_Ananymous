export default class Weapon {
  constructor(distance) {
    this._distance = distance;
    this._model = this._getUziModel();
  }

  _getUziModel() {
    return {
      obj: '../../../Models/UziGold/uziGold.obj',
      mtl: '../../../Models/UziGold/uziGold.mtl',
      mesh: null,
      castShadow: false
    }
  }
}