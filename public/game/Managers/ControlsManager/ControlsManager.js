import Mouse from "../../Controls/Mouse/Mouse";
import Keyboard from "../../Controls/Keyboard/Keyboard";
import threeFactory from '../../Three/ThreeFactory/ThreeFactory';

export default class ControlsManager {
  constructor(camera) {
    this._camera = camera;

    this._mouse = new Mouse();
    this._keyboard = new Keyboard();

    this._target = threeFactory.vector3D(0, 0, 0);

    this._movementSpeed = 1.0;
    this._lookSpeed = 0.005;

    this._lookVertical = true;

    this._activeLook = true;
    this._clickMove = false;

    this._heightSpeed = false;
    this._heightCoef = 1.0;
    this._heightMin = 0.0;

    this._constrainVertical = true;
    this._verticalMin = 0;
    this._verticalMax = Math.PI;

    this._autoSpeedFactor = 0.0;

    this._lat = 0;
    this._lon = 0;
    this._phi = 0;
    this._theta = 0;
  }

  update(delta, checkCollision) {
    if (this._heightSpeed) {

      const y = THREE.Math.clamp(this._camera.position.y, this._heightMin, this._heightMax);
      const heightDelta = y - this._heightMin;

      this._autoSpeedFactor = delta * ( heightDelta * this._heightCoef );

    } else {

      this._autoSpeedFactor = 0.0;

    }

    let actualMoveSpeed = delta * this._movementSpeed;

    if (this._keyboard.forward) {
      this._camera.translateZ(-( actualMoveSpeed + this._autoSpeedFactor ));
      if (checkCollision(this._camera.position)) {
        this._camera.translateZ(actualMoveSpeed + this._autoSpeedFactor);
      }
    }
    if (this._keyboard.backward) {
      this._camera.translateZ(actualMoveSpeed);
      if (checkCollision(this._camera.position)) {
        this._camera.translateZ(-actualMoveSpeed);
      }
    }

    if (this._keyboard.left) {
      this._camera.translateX(-actualMoveSpeed);
      if (checkCollision(this._camera.position)) {
        this._camera.translateX(actualMoveSpeed);
      }
    }
    if (this._keyboard.right) {
      this._camera.translateX(actualMoveSpeed);
      if (checkCollision(this._camera.position)) {
        this._camera.translateX(-actualMoveSpeed);
      }
    }

    let actualLookSpeed = delta * this._lookSpeed;

    if (!this._activeLook) {

      actualLookSpeed = 0;

    }

    this._lon += this._mouse.mouseX * actualLookSpeed;
    if (this._lookVertical) this._lat -= this._mouse.mouseY * actualLookSpeed; // * this._invertVertical?-1:1;

    this._lat = Math.max(-85, Math.min(85, this._lat));
    this._phi = ( 90 - this._lat ) * Math.PI / 180;
    this._theta = this._lon * Math.PI / 180;

    let targetPosition = this._target;
    let position = this._camera.position;

    targetPosition.x = position.x + 100 * Math.sin(this._phi) * Math.cos(this._theta);
    targetPosition.y = position.y + 100 * Math.cos(this._phi);
    targetPosition.z = position.z + 100 * Math.sin(this._phi) * Math.sin(this._theta);

    let verticalLookRatio = 1;

    if (this._constrainVertical) {

      verticalLookRatio = Math.PI / ( this._verticalMax - this._verticalMin );

    }

    this._lon += this._mouse.mouseX * actualLookSpeed;
    if (this._lookVertical) this._lat -= this._mouse.mouseY * actualLookSpeed * verticalLookRatio;

    this._lat = Math.max(-85, Math.min(85, this._lat));
    this._phi = ( 90 - this._lat ) * Math.PI / 180;

    this._theta = this._lon * Math.PI / 180;

    if (this._constrainVertical) {

      this._phi = THREE.Math.mapLinear(this._phi, 0, Math.PI, this._verticalMin, this._verticalMax);

    }

    targetPosition = this._target;
    position = this._camera.position;

    targetPosition.x = position.x + 100 * Math.sin(this._phi) * Math.cos(this._theta);
    targetPosition.y = position.y + 100 * Math.cos(this._phi);
    targetPosition.z = position.z + 100 * Math.sin(this._phi) * Math.sin(this._theta);

    this._camera.lookAt(targetPosition);
  }

  setEvents(onClickCallback = null, onMouseMoveCallback = null) {
    document.addEventListener('click', this._mouse.onClickMouse(onClickCallback));
    document.addEventListener('mousemove', this._mouse.onMouseMove());
  }
}
