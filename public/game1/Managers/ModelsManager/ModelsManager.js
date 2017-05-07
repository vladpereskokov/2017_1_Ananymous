class ModelsManager {
  constructor() {
    if (ModelsManager.__instance) {
      return ModelsManager.__instance;
    }

    this._models = {};
    ModelsManager.__instance = this;
  }

  get models() {
    return this._models;
  }

  add(model) {
    this._models[model.title] = model.object;
  }
}

const modelsManager = new ModelsManager();

export default modelsManager;
