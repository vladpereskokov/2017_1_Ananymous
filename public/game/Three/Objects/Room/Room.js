import threeFactory from '../../ThreeFactory/ThreeFactory';

export default class Room {
  constructor(...settings) {
    const [width = 100, height = 25, len = 200, x = 0, y = 0, z = 0] = settings;
    this._walls = this._getWallsObject(width, height, len, x, y, z)
  }

  create() {
    let result = [];
     Physijs.scripts.worker = '/lib/physijs_worker.js';
     Physijs.scripts.ammo = '/lib/ammo.js';

    this._walls.forEach(element => {
      const geometry = threeFactory.boxGeometry(
        element.geometry[0],
        element.geometry[1],
        element.geometry[2]);
      const material = threeFactory.meshBasicMaterial({color: element.color});
      const mesh = new Physijs.BoxMesh(geometry, material, 0);

      mesh.position.x = element.position[0];
      mesh.position.y = element.position[1];
      mesh.position.z = element.position[2];

      result.push(mesh);
    });

    return result;
  }

  _getWallsObject(width, height, len, x, y, z) {
    return [
      {
        position: [x, y + height/2, z + width/2],
        geometry: [len, height, 2],
        color: 0x999999
      }, {
        position: [x, y + height/2, z - width/2],
        geometry: [len, height, 2],
        color: 0x999999
      }, {
        position: [x + len/2, y + height/2, z],
        geometry: [2, height, width],
        color: 0x999999
      }, {
        position: [x - len/2, y + height/2, z],
        geometry: [2, height, width],
        color: 0x999999
      }
    ];
  }
}