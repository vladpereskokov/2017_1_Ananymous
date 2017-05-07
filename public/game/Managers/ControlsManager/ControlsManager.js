import threeFactory from '../../Three/ThreeFactory/ThreeFactory';
import Mouse from "../../Controls/Mouse/Mouse";
import Keyboard from "../../Controls/Keyboard/Keyboard";

export default class ControlsManager {
  constructor(camera) {
    this.camera = camera;
    this.target = threeFactory.vector3D(0, 0, 0);

    this.mouse = new Mouse();
    this.keyboard = new Keyboard();

    this.movementSpeed = 100;
    this.lookSpeed = 0.075;

    this.clickMove = false;

    this.heightSpeed = false;
    this.heightCoef = 1.0;
    this.heightMin = 0.0;

    this.constrainVertical = true;
    this.verticalMin = 0;
    this.verticalMax = Math.PI;

    this.autoSpeedFactor = 0.0;

    this.lat = 0;
    this.lon = 0;
    this.phi = 0;
    this.theta = 0;

  }

  setEvents(onClickCallback = null, onMoveCallback = null) {
    document.addEventListener('contextmenu', event => {
      event.preventDefault();
    });

    document.addEventListener('click', this.mouse.onClickMouse(onClickCallback));
    document.addEventListener('mousemove', this.mouse.onMouseMove());
  }

  update(delta, checkCollision) {
    if (this.heightSpeed) {

      var y = THREE.Math.clamp(this.camera.position.y, this.heightMin, this.heightMax);
      var heightDelta = y - this.heightMin;

      this.autoSpeedFactor = delta * ( heightDelta * this.heightCoef );

    } else {

      this.autoSpeedFactor = 0.0;

    }

    var actualMoveSpeed = delta * this.movementSpeed;

    if (this.keyboard.forward) {
      this.camera.translateZ(-( actualMoveSpeed + this.autoSpeedFactor ));
      if (checkCollision(this.camera.position)) {
        this.camera.translateZ(actualMoveSpeed + this.autoSpeedFactor);
      }
    }
    if (this.keyboard.backward) {
      this.camera.translateZ(actualMoveSpeed);
      if (checkCollision(this.camera.position)) {
        this.camera.translateZ(-actualMoveSpeed);
      }
    }

    if (this.keyboard.left) {
      this.camera.translateX(-actualMoveSpeed);
      if (checkCollision(this.camera.position)) {
        this.camera.translateX(actualMoveSpeed);
      }
    }
    if (this.keyboard.right) {
      this.camera.translateX(actualMoveSpeed);
      if (checkCollision(this.camera.position)) {
        this.camera.translateX(-actualMoveSpeed);
      }
    }

    var actualLookSpeed = delta * this.lookSpeed;

    this.lon += this.mouse.mouseX * actualLookSpeed;

    this.lat = Math.max(-85, Math.min(85, this.lat));
    this.phi = ( 90 - this.lat ) * Math.PI / 180;
    this.theta = this.lon * Math.PI / 180;

    let targetPosition = this.target;
    let position = this.camera.position;

    targetPosition.x = position.x + 100 * Math.sin(this.phi) * Math.cos(this.theta);
    targetPosition.y = position.y + 100 * Math.cos(this.phi);
    targetPosition.z = position.z + 100 * Math.sin(this.phi) * Math.sin(this.theta);


    this.lon += this.mouse.mouseX * actualLookSpeed;

    this.lat = Math.max(-85, Math.min(85, this.lat));
    this.phi = ( 90 - this.lat ) * Math.PI / 180;

    this.theta = this.lon * Math.PI / 180;


    targetPosition = this.target;
    position = this.camera.position;

    targetPosition.x = position.x + 100 * Math.sin(this.phi) * Math.cos(this.theta);
    targetPosition.y = position.y + 100 * Math.cos(this.phi);
    targetPosition.z = position.z + 100 * Math.sin(this.phi) * Math.sin(this.theta);

    this.camera.lookAt(targetPosition);
  }
}