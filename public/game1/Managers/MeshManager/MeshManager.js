class MeshManager {
  constructor() {
    if (MeshManager.__instance) {
      return MeshManager.__instance;
    }

    this._meshes = {};
    MeshManager.__instance = this;
  }

  get meshes() {
    return this._meshes;
  }
}

const meshManager = new MeshManager();

export default meshManager;
