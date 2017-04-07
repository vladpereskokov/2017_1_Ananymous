export default class Weapon {
  constructor() {
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
