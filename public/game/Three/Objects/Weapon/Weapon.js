export default class Weapon {
  constructor(distance) {
    this._distance = distance;
    this._model = this._getUziModel();
  }

  _getUziModel() {
    return {
      obj: '/game/Models/UziGold/uziGold.obj',
      mtl: '/game/Models/UziGold/uziGold.mtl',
      mesh: null,
      castShadow: false
    };
  }
}
