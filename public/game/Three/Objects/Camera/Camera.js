import threeFactory from '../../ThreeFactory/ThreeFactory';

export default class Camera {
  constructor() {
    this._init();
  }

  get getCamera() {
    return this._camera;
  }

  _init() {
    this._camera = threeFactory
      .perspectiveCamera(75, window.innerWidth / window.innerHeight, 1, 1000);
  }
}
