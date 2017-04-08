import threeFactory from '../Three/ThreeFactory/ThreeFactory';
import sceneManager from '../Managers/SceneManager/SceneManager';
import modelsManager from '../Managers/ModelsManager/ModelsManager';
import meshManager from '../Managers/MeshManager/MeshManager';
import Floor from '../Three/Objects/Floor/Floor';
import Box from '../Three/Objects/Box/Box';
import Room from '../Three/Objects/Room/Room';
import Camera from '../Three/Objects/Camera/Camera';
import Player from '../Three/Objects/Player/Player';
import LoadingObject from '../Three/ThreeModules/LoadingObject/LoadingObject';
import Weapon from '../Three/Objects/Weapon/Weapon';
import bulletsManager from '../Managers/BulletsManager/BulletsManager';

export default class GameScene {
  constructor(pointerLock, mouse, keys) {
    this._mouse = mouse;
    this._keys = keys;
    this._previousTime = performance.now();
    this._player = new Player(1.8, 0.2, Math.PI * 0.02, 100000);
    this._objects = [];
    this._renderer = null;

    this._setShootMouse();

    this._init(pointerLock);
    //this._animate();
  }

  _setShootMouse() {
    document.addEventListener('mousedown', (event) => {
      bulletsManager.shoot(this._player, this._controls.getPitch.rotation.x,
        this._controls.getObject.rotation.y);
    });
  }

  _init(pointerLock) {
    this._camera = new Camera(this._player).getCamera;

    this._setupModels();

    this._setupFog();
    this._setupLight();
    this._setupControlls(pointerLock);
    this._setupLoadModels(this._onResourcesLoaded.bind(this));
    this._setupRaycaster();

    this._appendFloor();
    this._appendBoxes();

    this._appendRoom();

    this._render();

    window.addEventListener('resize', this._onWindowResize, false);
  }

  _setupModels() {
    modelsManager.add({
      title: 'uzi',
      object: new Weapon()._getUziModel()
    });
  }

  _setupFog() {
    sceneManager.scene.fog = threeFactory.fog(0xffffff, 0, 750);
  }

  _setupLight() {
    this._light = threeFactory.hemisphereLight(0xeeeeff, 0x777788, 0.75);
    this._light.position.set(0.5, 1, 0.75);
    sceneManager.add(this._light);
  }

  _setupControlls(pointerLock) {
    this._controls = pointerLock(this._camera);
    this._controls.setMouseMove(this._mouse
      .onMouseMove(this._controls.getPitch, this._controls.getObject));

    sceneManager.add(this._controls.getObject);
  }

  _onResourcesLoaded() {
    Physijs.scripts.worker = '/lib/physijs_worker.js';
    Physijs.scripts.ammo = '/lib/ammo.js';

    meshManager.meshes["playerweapon"] = modelsManager.models.uzi.mesh.clone();
    meshManager.meshes["playerweapon"].position.set(0, 2, 0);
    meshManager.meshes["playerweapon"].scale.set(8, 8, 8);
    sceneManager.add(meshManager.meshes["playerweapon"]);

    meshManager.meshes["playerobject"] = new Physijs.SphereMesh(threeFactory.sphereGeometry(1, 12, 12),
        threeFactory.meshBasicMaterial({color: 0x000000}), 100);
    meshManager.meshes["playerobject"].position.set(0, 2, 0);
    sceneManager.add(meshManager.meshes["playerobject"]);

    this._animate();
  }

  _setupLoadModels(callback) {
    this._loadManager = new LoadingObject(modelsManager.models,
      callback);
  }

  _setupRaycaster() {
    this._raycaster = threeFactory
      .raycaster(threeFactory.vector3D(),
        threeFactory.vector3D(0, -1, 0), 0, 10);
  }

  _appendFloor() {
    sceneManager.add(new Floor().getFloor);
  }

  _appendBoxes() {
    for (let i = 0; i < 500; ++i) {
      let box = new Box(0xC1876B, 3, 3, 3).getBox;
      box.position.x = Math.floor(Math.random() * 20 - 10) * 20;
      box.position.y = Math.floor(Math.random() * 20) * 20 + 10;
      box.position.z = Math.floor(Math.random() * 20 - 10) * 20;

      sceneManager.add(box);
      this._objects.push(box);
    }
  }

  _appendRoom() {
    const walls = new Room(300, 30, 500).create();

    for (let wall of walls) {
      sceneManager.add(wall);
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
    sceneManager.scene.simulate();

    bulletsManager.bulletsService();

    const gunDistance = 1.4;

    if (this._keys.getEnabled) {
      this._raycaster.ray.origin.copy(this._controls.getObject.position);
      this._raycaster.ray.origin.y -= 10;

      const intersections = this._raycaster.intersectObjects(this._objects);
      const time = performance.now();

      this._newAction(time, (time - this._previousTime) / 1000,
        intersections.length > 0);
    }

    meshManager.meshes["playerweapon"].position.set(
      this._controls.getObject.position.x - gunDistance * Math.sin(this._controls.getObject.rotation.y - Math.PI / 30),
      this._controls.getObject.position.y + 1.3 + Math.sin(this._controls.getPitch.rotation.x),
      this._controls.getObject.position.z - gunDistance * Math.cos(this._controls.getObject.rotation.y - Math.PI / 30)
    );
    meshManager.meshes["playerweapon"].rotation.set(
      this._controls.getPitch.rotation.x,
      this._controls.getObject.rotation.y - Math.PI,
      0,
    );

    meshManager.meshes["playerobject"].position.set(
        this._controls.getObject.position.x,
        this._controls.getObject.position.y - this._player.getHeight,
        this._controls.getObject.position.z
    );


    this._renderer.render(sceneManager.scene, this._camera);
  }

  _newAction(time, delta, isOnObject) {
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

    this._previousTime = time;
  }

  _onWindowResize() {
    this._camera.aspect = window.innerWidth / window.innerHeight;
    this._camera.updateProjectionMatrix();

    this._renderer.setSize(window.innerWidth, window.innerHeight);
  }
}