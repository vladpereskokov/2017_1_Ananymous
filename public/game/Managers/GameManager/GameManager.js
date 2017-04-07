import Mouse from '../../Controlls/Mouse/Mouse';
import Controlls from '../../Controlls/Controlls/Controlls';
import PointerLockApiManager from '../PointerLockApiManager/PointerLockApiManager';
import GameScene from "../../GameScene/GameScene";

export default class GameManager {
  constructor() {
    this._mouse = new Mouse();
    this._keys = new Controlls();

    this._pointerLockManager = new PointerLockApiManager({
      blocker: document.getElementById('blocker'),
      instructions: document.getElementById('instructions')
    }, this._keys, this._mouse);

    this._gameScene = new GameScene((camera) =>
        this._pointerLockManager.getPointerLock(camera),
      this._mouse, this._keys);
  }
}
