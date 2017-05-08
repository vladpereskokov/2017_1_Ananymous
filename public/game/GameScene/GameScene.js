import threeFactory from '../Three/ThreeFactory/ThreeFactory';
import ControlsManager from "../Managers/ControlsManager/ControlsManager";
import Camera from "../Three/Objects/Camera/Camera";
import Floor from "../Three/Objects/Floor/Floor";
import Walls from "../Three/Objects/Walls/Walls";
import Player from "../Three/Objects/Player/Player";
import Bullet from "../Three/Objects/Bullet/Bullet";
import PlayerService from '../Services/PlayerService/PlayerService';
import playersService from '../Services/PlayersService/PlayersService';
import BulletService from '../Services/BulletService/BulletService';
import bulletsService from '../Services/BulletsService/BulletsService';

var map = [ // 1  2  3  4  5  6  7  8  9
  [1, 1, 1, 1, 1, 1, 1, 1, 1, 1,], // 0
  [1, 1, 0, 0, 0, 0, 0, 1, 1, 1,], // 1
  [1, 1, 0, 0, 2, 0, 0, 0, 0, 1,], // 2
  [1, 0, 0, 0, 0, 2, 0, 0, 0, 1,], // 3
  [1, 0, 0, 2, 0, 0, 2, 0, 0, 1,], // 4
  [1, 0, 0, 0, 2, 0, 0, 0, 1, 1,], // 5
  [1, 1, 1, 0, 0, 0, 0, 1, 1, 1,], // 6
  [1, 1, 1, 0, 0, 1, 0, 0, 1, 1,], // 7
  [1, 1, 1, 1, 1, 1, 0, 0, 1, 1,], // 8
  [1, 1, 1, 1, 1, 1, 1, 1, 1, 1,], // 9
], mapW = map.length, mapH = map[0].length;

// Semi-constants
var WIDTH = window.innerWidth,
  HEIGHT = window.innerHeight,
  ASPECT = WIDTH / HEIGHT,
  UNITSIZE = 250,
  WALLHEIGHT = UNITSIZE / 3,
  MOVESPEED = 100,
  LOOKSPEED = 0.075,
  BULLETMOVESPEED = MOVESPEED * 10,
  NUMAI = 5,
  PROJECTILEDAMAGE = 20;
// Global vars
var t = THREE;
var runAnim = true, mouse = {x: 0, y: 0}, kills = 0, health = 100;


var ai = [];
var aiGeo = new t.CubeGeometry(40, 40, 40);


var bullets = [];
var sphereMaterial = new t.MeshBasicMaterial({color: 0x333333});
var sphereGeo = new t.SphereGeometry(3, 6, 6);

export default class GameScene {
  constructor() {
    this._start(this._init.bind(this), this._animate.bind(this));
  }

  _start(init, animate) {
    $(document).ready(function () {
      $('body').append('<div id="intro">Click to start</div>');
      $('#intro').css({width: WIDTH, height: HEIGHT}).one('click', function (e) {
        e.preventDefault();
        // $(this).fadeOut();
        init();
        // setInterval(drawRadar, 1000);
        animate();
      });
    });
  }

  _init() {
    this._setUpClock();
    this._setUpScene();
    this._setUpFog();
    this._setUpCamera();
    this._setUpControls();

    this._makeScene();
    this._setUpAI();

    this._setUpRender();
  }

  _animate() {
    if (runAnim) {
      requestAnimationFrame(this._animate.bind(this));
    }

    this._render();
  }

  _setUpClock() {
    this._clock = threeFactory.clock();
  }

  _setUpScene() {
    this._scene = threeFactory.scene();
  }

  _setUpFog() {
    this._scene.fog = threeFactory.fogExp2(0xD6F1FF, 0.0005);
  }

  _setUpCamera() {
    this._camera = new Camera({
      getHeight: UNITSIZE * 0.2
    }).getCamera;

    this._scene.add(this._camera);
  }

  _setUpControls() {
    this._controls = new ControlsManager(this._camera);
    this._controls.setEvents(this._createBullet.bind(this));
  }

  _setUpRender() {
    this._renderer = threeFactory.webGLRender();
    this._renderer.setClearColor(0xD6F1FF);
    this._renderer.setSize(WIDTH, HEIGHT);
    document.body.appendChild(this._renderer.domElement);
  }

  _makeScene() {
    this._setUpFloor(mapW * UNITSIZE);

    this._setUpWalls();

    this._setUpLight(0xF7EFBE, 0.7, 0.5, 1, 0.5);
    this._setUpLight(0xF7EFBE, 0.5, -0.5, -1, -0.5);
  }

  _setUpFloor(size) {
    this._scene.add(new Floor(size).object);
  }

  _setUpWalls() {
    for (let i = 0; i < mapW; i++) {
      for (let j = 0, m = map[i].length; j < m; j++) {
        if (map[i][j]) {
          const wall = new Walls(map[i][j] - 1, UNITSIZE, WALLHEIGHT, UNITSIZE).object;

          wall.position.x = (i - mapW / 2) * UNITSIZE;
          wall.position.y = WALLHEIGHT / 2;
          wall.position.z = (j - mapW / 2) * UNITSIZE;

          this._scene.add(wall);
        }
      }
    }
  }

  _setUpLight(hex, intensity, x, y, z) {
    const directionalLight = threeFactory.directionalLight(hex, intensity);
    directionalLight.position.set(x, y, z);

    this._scene.add(directionalLight);
  }

  _setUpAI() {
    for (let i = 0; i < 16; i++) {
      this._addAI();
    }
  }

  _addAI() {
    const position = this._getMapSector(this._camera.position);

    let [x, z] = this._getPosition();
    while (map[x][z] > 0 || (x === position.x && z === position.z)) {
      [x, z] = this._getPosition();
    }

    x = Math.floor(x - mapW / 2) * UNITSIZE;
    z = Math.floor(z - mapW / 2) * UNITSIZE;

    const playerObject = new Player().object;
    playerObject.position.set(x, UNITSIZE * 0.15, z);

    playersService.add(new PlayerService(playerObject, 100));
    this._scene.add(playerObject);
  }

  _updateBullets(delta) {
    for (let i in bulletsService.all) {
      const bullet = bulletsService.getBullet(i);
      const position = bullet.object.position;

      if (this._checkWallCollision(position)) {
        bulletsService.remove(i);
        this._scene.remove(bullet.object);

        continue;
      }

      // Collide with AI
      let hit = false;

      for (let j in playersService.all) {
        const player = playersService.getPlayer(j);

        const vertices = player.object.geometry.vertices[0];
        const playerPosition = player.object.position;

        const x = Math.abs(vertices.x);
        const z = Math.abs(vertices.z);

        if (position.x < playerPosition.x + x &&
          position.x > playerPosition.x - x &&
          position.z < playerPosition.z + z &&
          position.z > playerPosition.z - z &&
          bullet.owner !== player.object) {

          bulletsService.remove(i);
          this._scene.remove(bullet.object);
          player.health = player.health - PROJECTILEDAMAGE;

          const color = player.object.material.color;
          const percent = player.health / 100;

          player.object.material.color.setRGB(
            Math.max(percent, 1) * color.r,
            percent * color.g,
            percent * color.b
          );

          hit = true;
          break;
        }
      }

      // Bullet hits player
      if (this._distance(position.x, position.z, this._camera.position.x, this._camera.position.z) < 25
        && bullet.owner !== this._camera) {
        $('#hurt').fadeIn(75);
        health -= 10;
        if (health < 0) health = 0;
        var val = health < 25 ? '<span style="color: darkRed">' + health + '</span>' : health;
        $('#health').html(val);
        bulletsService.remove(i);
        this._scene.remove(bullet);
        $('#hurt').fadeOut(350);
      }

      if (!hit) {
        const speed = delta * BULLETMOVESPEED;
        const direction = bullet.object.ray.direction;

        bullet.object.translateX(speed * direction.x);
        bullet.object.translateZ(speed * direction.z);
      }
    }
  }

  _render() {
    const delta = this._clock.getDelta();
    var aispeed = delta * MOVESPEED;
    this._controls.update(delta, this._checkWallCollision.bind(this));

    // Update bullets. Walk backwards through the list so we can remove items.
    this._updateBullets(delta);

    // Update AI.
    for (let i in playersService.all) {
      let player = playersService.getPlayer(i);

      if (player.health <= 0) {
        playersService.remove(i);

        this._scene.remove(player.object);
        ++kills;

        $('#score').html(kills * 100);
        this._addAI();
      }

      const step = Math.random();

      if (step > 0.995) {
        player.x = Math.random() * 2 - 1;
        player.z = Math.random() * 2 - 1;
      }

      player.translateX(aispeed * player.x);
      player.translateZ(aispeed * player.z);

      const position = player.object.position;
      const sector = this._getMapSector(position);

      if (sector.x < 0 || sector.x >= mapW || sector.y < 0 || sector.y >= mapH ||
        this._checkWallCollision(position)) {
        player.translateX(-2 * aispeed * player.x);
        player.translateZ(-2 * aispeed * player.z);
        player.x = Math.random() * 2 - 1;
        player.z = Math.random() * 2 - 1;
      }

      if (sector.x < -1 || sector.x > mapW || sector.z < -1 || sector.z > mapH) {
        playersService.remove(i);
        this._scene.remove(player.object);
        this._addAI();
      }

      //   // var cc = this._getMapSector(this._camera.position);
      //   // if (Date.now() > a.lastShot + 750 && this._distance(c.x, c.z, cc.x, cc.z) < 2) {
      //   // 	this._createBullet(a);
      //   // 	a.lastShot = Date.now();
      //   // }
    }

    this._renderer.render(this._scene, this._camera); // Repaint

    // Death
    if (health <= 0) {
      runAnim = false;
      $(this._renderer.domElement).fadeOut();
      $('#radar, #hud, #credits').fadeOut();
      $('#intro').fadeIn();
      $('#intro').html('Ouch! Click to restart...');
      $('#intro').one('click', function () {
        location = location;
        $(this._renderer.domElement).fadeIn();
        $('#radar, #hud, #credits').fadeIn();
        $(this).fadeOut();
        runAnim = true;
        this._animate();
        health = 100;
        $('#health').html(health);
        kills--;
        if (kills <= 0) kills = 0;
        $('#score').html(kills * 100);
        this._camera.translateX(-this._camera.position.x);
        this._camera.translateZ(-this._camera.position.z);
      });
    }
  }

  _getPosition() {
    return [this._getRandBetween(0, mapW - 1), this._getRandBetween(0, mapH - 1)]
  }

  _checkWallCollision(v) {
    var c = this._getMapSector(v);
    return map[c.x][c.z] > 0;
  }

  _createBullet(object) {
    if (object === undefined) {
      object = this._camera;
    }

    const sphere = new Bullet().object;
    // sphere.position.set(object.position.x, object.position.y * 0.8, object.position.z);
    //
    // let vector = null;
    //
    // if (object instanceof t.Camera) {
    //   vector = threeFactory.vector3D(0, 0, 1);
    //   vector.unproject(object);
    // }
    // else {
    //   vector = this._camera.position.clone();
    // }
    //
    // sphere.ray = threeFactory.ray(
    //   object.position,
    //   vector.sub(object.position).normalize()
    // );
    // sphere.owner = object;

    const bullet = new BulletService(sphere, object);

    bulletsService.add(bullet);
    this._scene.add(bullet.object);
  }

  _getRandBetween(lo, hi) {
    return parseInt(Math.floor(Math.random() * (hi - lo + 1)) + lo, 10);
  }

  _distance(x1, y1, x2, y2) {
    return Math.sqrt((x2 - x1) * (x2 - x1) + (y2 - y1) * (y2 - y1));
  }

  _getMapSector(v) {
    var x = Math.floor((v.x + UNITSIZE / 2) / UNITSIZE + mapW / 2);
    var z = Math.floor((v.z + UNITSIZE / 2) / UNITSIZE + mapW / 2);
    return {x: x, z: z};
  }
}