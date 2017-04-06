import threeFactory from '../../ThreeFactory/ThreeFactory';

export default class Camera {
  constructor(player) {
    this._init(player);
  }

  get getCamera() {
    return this._camera;
  }

  _init(player) {
    this._camera = threeFactory
      .perspectiveCamera(75, window.innerWidth / window.innerHeight, 1, 1000);

    this._camera.position.set(0, player.height, 0);
    this._camera.lookAt(threeFactory.vector3D(0, player.getHeight, 0));
  }
}
