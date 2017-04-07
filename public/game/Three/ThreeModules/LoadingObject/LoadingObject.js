import threeFactory from '../../ThreeFactory/ThreeFactory';
import meshManager from '../../../Managers/MeshManager/MeshManager';

export default class LoadingObject {
  constructor(models, callback) {
    this._models = models;
    this._callback = callback;
    this._resourcesLoaded = false;
    this._init();
  }

  load() {
    console.log(this._models);
    for (let model of Object.keys(this._models)) {
      this._loadModel(model);
    }
  }

  _loadModel(model) {
    const mtlLoader = threeFactory.mtlLoader(this._loadManager);

    mtlLoader.load(model.mtl, (materials) => {
      materials.preload();

      const objLoader = threeFactory.objLoader(this._loadManager);

      objLoader.setMaterials(materials);
      objLoader.load(model.obj, (mesh) => {
        mesh.traverse((node) => {
          if (node instanceof THREE.Mesh) {
            if ('castShadow' in model) {
              node.castShadow = model.castShadow;
            } else {
              node.castShadow = true;
            }

            if ('receiveShadow' in model) {
              node.receiveShadow = model.receiveShadow
            } else {
              node.receiveShadow = true;
            }
          }
        });

        model.mesh = mesh;
      });
    });
  }

  get manager() {
    return this._loadManager;
  }

  _init(models) {
    this._loadManager = threeFactory.loadingManager();


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
      this._resourcesLoaded = true;
      this._onResourcesLoaded();
    };
  }

  _onResourcesLoaded() {
    meshManager.meshes["playerweapon"] = this._models.uzi.mesh.clone();
    meshManager.meshes["playerweapon"].position.set(0,2,0);
    meshManager.meshes["playerweapon"].scale.set(10,10,10);

    this._callback();
  }
}