import threeFactory from '../Three/ThreeFactory/ThreeFactory';
import Floor from "../Three/Objects/Floor/Floor";
import Box from "../Three/Objects/Box/Box";
import Camera from "../Three/Objects/Camera/Camera";

export default class Scene {
  constructor(pointerLock, mouse, keys) {
    this._mouse = mouse;
    this._keys = keys;
    this._previousTime = performance.now();
    this._objects = [];
    this._renderer = null;

    this._init(pointerLock);
    this._animate();
  }

  _init(pointerLock) {
    this._camera = new Camera().getCamera;

    this._setupFog();
    this._setupLight();
    this._setupControlls(pointerLock);
    this._setupRaycaster();

    this._appendFloor();
    this._appendBoxes();

    this._render();

    window.addEventListener('resize', this._onWindowResize, false);
  }

  _setupFog() {
    this._scene = threeFactory.scene();
    this._scene.fog = threeFactory.fog(0xffffff, 0, 750);
  }

  _setupLight() {
    this._light = threeFactory.hemisphereLight(0xeeeeff, 0x777788, 0.75);
    this._light.position.set(0.5, 1, 0.75);
    this._scene.add(this._light);
  }

  _setupControlls(pointerLock) {
    this._controls = pointerLock(this._camera);
    this._controls.setMouseMove(this._mouse
      .onMouseMove(this._controls.getPitch, this._controls.getObject));

    this._scene.add(this._controls.getObject);
  }

  _setupRaycaster() {
    this._raycaster = threeFactory
      .raycaster(threeFactory.vector3D(),
        threeFactory.vector3D(0, -1, 0), 0, 10);
  }

  _appendFloor() {
    this._scene.add(new Floor().getFloor);
  }

  _appendBoxes() {
    for (let i = 0; i < 20; ++i) {
      let box = new Box(0xC1876B, 20, 20, 20).getBox;
      box.position.x = Math.floor(Math.random() * 20 - 10) * 2;
      box.position.y = Math.floor(Math.random() * 20) * 2 + 10;
      box.position.z = Math.floor(Math.random() * 20 - 10) * 2;

      this._scene.add(box);
      this._objects.push(box);
    }
  }

  _render() {
    this._renderer = threeFactory.webGLRender();
    this._renderer.setClearColor(0xffffff);
    this._renderer.setPixelRatio(window.devicePixelRatio);
    this._renderer.setSize(window.innerWidth, window.innerHeight);

    document.body.appendChild(this._renderer.domElement);
  }

  _animate() {
    requestAnimationFrame(this._animate.bind(this));

    if (this._keys.getEnabled) {
      this._raycaster.ray.origin.copy(this._controls.getObject.position);
      this._raycaster.ray.origin.y -= 10;

      const intersections = this._raycaster.intersectObjects(this._objects);

      this._newAction((performance.now() - this._previousTime) / 1000,
        intersections.length > 0);

    }

    this._renderer.render(this._scene, this._camera);
  }

  _newAction(delta, isOnObject) {
    this._keys._velocity.x -= this._keys._velocity.x * 10.0 * delta;
    this._keys._velocity.z -= this._keys._velocity.z * 10.0 * delta;

    this._keys._velocity.y -= 9.8 * 100.0 * delta;

    if (this._keys._forward) {
      this._keys._velocity.z -= 400.0 * delta;
    }
    if (this._keys._backward) {
      this._keys._velocity.z += 400.0 * delta;
    }

    if (this._keys._left) {
      this._keys._velocity.x -= 400.0 * delta;
    }
    if (this._keys._right) {
      this._keys._velocity.x += 400.0 * delta;
    }

    if (isOnObject === true) {
      this._keys._velocity.y = Math.max(0, this._keys._velocity.y);

      this._keys._jump = true;
    }

    this._controls.getObject.translateX(this._keys._velocity.x * delta);
    this._controls.getObject.translateY(this._keys._velocity.y * delta);
    this._controls.getObject.translateZ(this._keys._velocity.z * delta);

    if (this._controls.getObject.position.y < 10) {

      this._keys._velocity.y = 0;
      this._controls.getObject.position.y = 10;

      this._keys._jump = true;

    }

    this._previousTime = performance.now();
  }

  _onWindowResize() {
    this._camera.aspect = window.innerWidth / window.innerHeight;
    this._camera.updateProjectionMatrix();

    this._renderer.setSize(window.innerWidth, window.innerHeight);
  }
}