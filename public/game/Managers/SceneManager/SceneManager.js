import threeFactory from '../../Three/ThreeFactory/ThreeFactory';

class SceneManager {
  constructor() {
    if (SceneManager.__instance) {
      return SceneManager.__instance;
    }

    this._scene = threeFactory.scene();
    SceneManager.__instance = this;
  }

  get scene() {
    return this._scene;
  }

  add(element) {
    this.scene.add(element);
  }

  remove(element) {
    this.scene.remove(element);
  }
}

const sceneManager = new SceneManager();

export default sceneManager;
