import threeFactory from './Three/ThreeFactory/ThreeFactory';
import Mouse from "./Controls/Mouse/Mouse";
import Keyboard from "./Controls/Keyboard/Keyboard";

export default class FirstPersonControl {
  constructor(object, checkCollision, bullet = null) {
    this.object = object;
    this.target = threeFactory.vector3D(0, 0, 0);

    this.mouse = new Mouse();
    this.keyboard = new Keyboard();

    this.domElement = document;

    this.movementSpeed = 0;
    this.lookSpeed = 0;

    this.lookVertical = true;

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

    this.update = function (delta) {

      if (this.heightSpeed) {

        var y = THREE.Math.clamp(this.object.position.y, this.heightMin, this.heightMax);
        var heightDelta = y - this.heightMin;

        this.autoSpeedFactor = delta * ( heightDelta * this.heightCoef );

      } else {

        this.autoSpeedFactor = 0.0;

      }

      var actualMoveSpeed = delta * this.movementSpeed;

      if (this.keyboard.forward) {
        this.object.translateZ(-( actualMoveSpeed + this.autoSpeedFactor ));
        if (checkCollision(this.object.position)) {
          this.object.translateZ(actualMoveSpeed + this.autoSpeedFactor);
        }
      }
      if (this.keyboard.backward) {
        this.object.translateZ(actualMoveSpeed);
        if (checkCollision(this.object.position)) {
          this.object.translateZ(-actualMoveSpeed);
        }
      }

      if (this.keyboard.left) {
        this.object.translateX(-actualMoveSpeed);
        if (checkCollision(this.object.position)) {
          this.object.translateX(actualMoveSpeed);
        }
      }
      if (this.keyboard.right) {
        this.object.translateX(actualMoveSpeed);
        if (checkCollision(this.object.position)) {
          this.object.translateX(-actualMoveSpeed);
        }
      }

      var actualLookSpeed = delta * this.lookSpeed;

      this.lon += this.mouse.mouseX * actualLookSpeed;
      if (this.lookVertical) this.lat -= this.mouse.mouseY * actualLookSpeed; // * this.invertVertical?-1:1;

      this.lat = Math.max(-85, Math.min(85, this.lat));
      this.phi = ( 90 - this.lat ) * Math.PI / 180;
      this.theta = this.lon * Math.PI / 180;

      var targetPosition = this.target,
        position = this.object.position;

      targetPosition.x = position.x + 100 * Math.sin(this.phi) * Math.cos(this.theta);
      targetPosition.y = position.y + 100 * Math.cos(this.phi);
      targetPosition.z = position.z + 100 * Math.sin(this.phi) * Math.sin(this.theta);


      var verticalLookRatio = 1;

      if (this.constrainVertical) {

        verticalLookRatio = Math.PI / ( this.verticalMax - this.verticalMin );

      }

      this.lon += this.mouse.mouseX * actualLookSpeed;
      if (this.lookVertical) this.lat -= this.mouse.mouseY * actualLookSpeed * verticalLookRatio;

      this.lat = Math.max(-85, Math.min(85, this.lat));
      this.phi = ( 90 - this.lat ) * Math.PI / 180;

      this.theta = this.lon * Math.PI / 180;

      if (this.constrainVertical) {

        this.phi = THREE.Math.mapLinear(this.phi, 0, Math.PI, this.verticalMin, this.verticalMax);

      }

      var targetPosition = this.target,
        position = this.object.position;

      targetPosition.x = position.x + 100 * Math.sin(this.phi) * Math.cos(this.theta);
      targetPosition.y = position.y + 100 * Math.cos(this.phi);
      targetPosition.z = position.z + 100 * Math.sin(this.phi) * Math.sin(this.theta);

      this.object.lookAt(targetPosition);

    };


    this.domElement.addEventListener('contextmenu', function (event) {
      event.preventDefault();
    }, false);

    this.domElement.addEventListener('click', this.mouse.onClickMouse(bullet));
    this.domElement.addEventListener('mousemove', this.mouse.onMouseMove(), false);

    function bind(scope, fn) {

      return function () {

        fn.apply(scope, arguments);

      };

    };

    function top() {
      return event => {
        var movementX = event.movementX || event.mozMovementX || event.webkitMovementX || 0;
        var movementY = event.movementY || event.mozMovementY || event.webkitMovementY || 0;

        yawObject.rotation.y -= movementX * 0.002;
        pitchObject.rotation.x -= movementY * 0.002;

        pitchObject.rotation.x = Math.max(-PI_2, Math.min(PI_2, pitchObject.rotation.x));
      }
    }
  }
}