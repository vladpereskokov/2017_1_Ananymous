import threeFactory from '../../ThreeFactory/ThreeFactory';
import meshManager from '../../../Managers/MeshManager/MeshManager';

export default class LoadingObject {
  constructor(models, callback) {
    this._models = models;
    this._callback = callback;
    this._init();
  }

  load() {
    console.log(this._models);

    for (let model in this._models) {
      this._loadModel(model);
    }
  }

  _loadModel(model) {
    const mtlLoader = threeFactory.mtlLoader(this._loadManager);

    mtlLoader.load(this._models[model].mtl, (materials) => {
      materials.preload();

      const objLoader = threeFactory.objLoader(this._loadManager);

      objLoader.setMaterials(materials);
      objLoader.load(this._models[model].obj, (mesh) => {
        mesh.traverse((node) => {
          if (node instanceof THREE.Mesh) {
            if ('castShadow' in this._models[model]) {
              node.castShadow = this._models[model].castShadow;
            } else {
              node.castShadow = true;
            }

            if ('receiveShadow' in this._models[model]) {
              node.receiveShadow = this._models[model].receiveShadow
            } else {
              node.receiveShadow = true;
            }
          }
        });

        this._models[model].mesh = mesh;
      });
    });
  }

  get manager() {
    return this._loadManager;
  }

  _init(models) {
    this._loadManager = threeFactory.loadingManager();
    this._setupLoadManager();

    this.load(models);
  }

  _setupLoadManager() {
    this._loadManager.onProgress = this._onProgress();
    this._loadManager.onLoad = this._onLoad();
  }

  _onProgress() {
    return (item, loaded, total) => {
      console.log(item, loaded, total);
    };
  }

  _onLoad() {
    return () => {
        console.log("loaded all resources");
      this._callback();
    };
  }
}