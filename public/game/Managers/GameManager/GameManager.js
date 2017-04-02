import Mouse from '../../Controlls/Mouse/Mouse';
import Controlls from '../../Controlls/Controlls/Controlls';
import PointerLockApiManager from '../PointerLockApiManager/PointerLockApiManager';
import Scene from "../../Scene/Scene";

export default class GameManager {
  constructor() {
    this._mouse = new Mouse();
    this._keys = new Controlls();

    this._pointerLockManager = new PointerLockApiManager({
      blocker: document.getElementById('blocker'),
      instructions: document.getElementById('instructions')
    }, this._keys, this._mouse);

    this._gameScene = new Scene((camera) =>
        this._pointerLockManager.getPointerLock(camera),
      this._mouse, this._keys);
  }
}
