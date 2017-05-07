import threeFactory from '../Three/ThreeFactory/ThreeFactory';
import FirstPersonControl from "../FirstPersonControl";
import Camera from "../Three/Objects/Camera/Camera";

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
var t = THREE, scene, cam, renderer, controls, clock, projector, model, skin;
var runAnim = true, mouse = {x: 0, y: 0}, kills = 0, health = 100;
var healthcube, lastHealthPickup = 0;


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

  _setUpClock() {
    this._clock = threeFactory.clock();
  }

  _setUpScene() {
    this._scene = threeFactory.scene();
  }

  _setUpFog() {
    this._scene.fog = threeFactory.fogExp2(0xD6F1FF, 0.0005);
  }

  _setUpCamera();

  _init() {
    this._setUpClock();
    this._setUpScene();
    this._setUpFog();
    this._setUpCamera();

    cam = new Camera({
      getHeight: UNITSIZE * 0.2
    }).getCamera;
    scene.add(cam);

    // Camera moves with mouse, flies around with WASD/arrow keys
    controls = new FirstPersonControl(cam, this._checkWallCollision.bind(this), this._createBullet.bind(this));
    controls.movementSpeed = MOVESPEED;
    controls.lookSpeed = LOOKSPEED;
    controls.lookVertical = false; // Temporary solution; play on flat surfaces only
    // controls.noFly = true;

    // World objects
    this._setupScene();

    // Artificial Intelligence
    this._setupAI();

    // Handle drawing as WebGL (faster than Canvas but less supported)
    renderer = new t.WebGLRenderer();
    renderer.setSize(WIDTH, HEIGHT);

    // Add the canvas to the document
    renderer.domElement.style.backgroundColor = '#D6F1FF'; // easier to see
    document.body.appendChild(renderer.domElement);

    // Track mouse position so we know where to shoot
    // document.addEventListener( 'mousemove', onDocumentMouseMove, false );
    // Display HUD
    $('body').append('<div id="hud"><p>Health: <span id="health">100</span><br />Score: <span id="score">0</span></p></div>');

    // Set up "hurt" flash
    $('body').append('<div id="hurt"></div>');
    $('#hurt').css({width: WIDTH, height: HEIGHT,});
  }

  _animate() {
    if (runAnim) {
      requestAnimationFrame(this._animate.bind(this));
    }
    this._render();
  }

  _render() {
    var delta = clock.getDelta(), speed = delta * BULLETMOVESPEED;
    var aispeed = delta * MOVESPEED;
    controls.update(delta, this._checkWallCollision.bind(this)); // Move camera

    // Rotate the health cube
    healthcube.rotation.x += 0.004;
    healthcube.rotation.y += 0.008;
    // Allow picking it up once per minute
    if (Date.now() > lastHealthPickup + 60000) {
      if (this._distance(cam.position.x, cam.position.z, healthcube.position.x, healthcube.position.z) < 15 && health != 100) {
        health = Math.min(health + 50, 100);
        $('#health').html(health);
        lastHealthPickup = Date.now();
      }
      healthcube.material.wireframe = false;
    }
    else {
      healthcube.material.wireframe = true;
    }

    // Update bullets. Walk backwards through the list so we can remove items.
    for (var i = bullets.length - 1; i >= 0; i--) {
      var b = bullets[i], p = b.position, d = b.ray.direction;
      if (this._checkWallCollision(p)) {
        bullets.splice(i, 1);
        scene.remove(b);
        continue;
      }
      // Collide with AI
      var hit = false;
      for (var j = ai.length - 1; j >= 0; j--) {
        var a = ai[j];
        var v = a.geometry.vertices[0];
        var c = a.position;
        var x = Math.abs(v.x), z = Math.abs(v.z);
        //console.log(Math.round(p.x), Math.round(p.z), c.x, c.z, x, z);
        if (p.x < c.x + x && p.x > c.x - x &&
          p.z < c.z + z && p.z > c.z - z &&
          b.owner != a) {
          bullets.splice(i, 1);
          scene.remove(b);
          a.health -= PROJECTILEDAMAGE;
          var color = a.material.color, percent = a.health / 100;
          a.material.color.setRGB(
            Math.max(percent, 1) * color.r,
            percent * color.g,
            percent * color.b
          );
          hit = true;
          break;
        }
      }
      // Bullet hits player
      if (this._distance(p.x, p.z, cam.position.x, cam.position.z) < 25 && b.owner != cam) {
        $('#hurt').fadeIn(75);
        health -= 10;
        if (health < 0) health = 0;
        var val = health < 25 ? '<span style="color: darkRed">' + health + '</span>' : health;
        $('#health').html(val);
        bullets.splice(i, 1);
        scene.remove(b);
        $('#hurt').fadeOut(350);
      }
      if (!hit) {
        b.translateX(speed * d.x);
        //bullets[i].translateY(speed * bullets[i].direction.y);
        b.translateZ(speed * d.z);
      }
    }

    // Update AI.
    for (var i = ai.length - 1; i >= 0; i--) {
      var a = ai[i];
      if (a.health <= 0) {
        ai.splice(i, 1);
        scene.remove(a);
        kills++;
        $('#score').html(kills * 100);
        this._addAI();
      }
      // Move AI
      var r = Math.random();
      if (r > 0.995) {
        a.lastRandomX = Math.random() * 2 - 1;
        a.lastRandomZ = Math.random() * 2 - 1;
      }
      a.translateX(aispeed * a.lastRandomX);
      a.translateZ(aispeed * a.lastRandomZ);
      var c = this._getMapSector(a.position);
      if (c.x < 0 || c.x >= mapW || c.y < 0 || c.y >= mapH || this._checkWallCollision(a.position)) {
        a.translateX(-2 * aispeed * a.lastRandomX);
        a.translateZ(-2 * aispeed * a.lastRandomZ);
        a.lastRandomX = Math.random() * 2 - 1;
        a.lastRandomZ = Math.random() * 2 - 1;
      }
      if (c.x < -1 || c.x > mapW || c.z < -1 || c.z > mapH) {
        ai.splice(i, 1);
        scene.remove(a);
        this._addAI();
      }
      // var cc = getMapSector(cam.position);
      // if (Date.now() > a.lastShot + 750 && distance(c.x, c.z, cc.x, cc.z) < 2) {
      // 	createBullet(a);
      // 	a.lastShot = Date.now();
      // }
    }

    renderer.render(scene, cam); // Repaint

    // Death
    if (health <= 0) {
      runAnim = false;
      $(renderer.domElement).fadeOut();
      $('#radar, #hud, #credits').fadeOut();
      $('#intro').fadeIn();
      $('#intro').html('Ouch! Click to restart...');
      $('#intro').one('click', function () {
        location = location;
        $(renderer.domElement).fadeIn();
        $('#radar, #hud, #credits').fadeIn();
        $(this).fadeOut();
        runAnim = true;
        animate();
        health = 100;
        $('#health').html(health);
        kills--;
        if (kills <= 0) kills = 0;
        $('#score').html(kills * 100);
        cam.translateX(-cam.position.x);
        cam.translateZ(-cam.position.z);
      });
    }
  }


  _setupScene() {
    var UNITSIZE = 250, units = mapW;

    // Geometry: floor
    var floor = new t.Mesh(
      new t.CubeGeometry(units * UNITSIZE, 10, units * UNITSIZE),
      new t.MeshLambertMaterial({color: 0xffffff, /*map: t.ImageUtils.loadTexture('images/floor-1.jpg')*/})
    );
    scene.add(floor);

    // Geometry: walls
    var cube = new t.CubeGeometry(UNITSIZE, WALLHEIGHT, UNITSIZE);
    var materials = [
      new t.MeshLambertMaterial({/*color: 0x00CCAA,*/map: t.ImageUtils.loadTexture('images/wall-1.jpg')}),
      new t.MeshLambertMaterial({/*color: 0xC5EDA0,*/map: t.ImageUtils.loadTexture('images/wall-2.jpg')}),
      new t.MeshLambertMaterial({color: 0xFBEBCD}),
    ];
    for (var i = 0; i < mapW; i++) {
      for (var j = 0, m = map[i].length; j < m; j++) {
        if (map[i][j]) {
          var wall = new t.Mesh(cube, materials[map[i][j] - 1]);
          wall.position.x = (i - units / 2) * UNITSIZE;
          wall.position.y = WALLHEIGHT / 2;
          wall.position.z = (j - units / 2) * UNITSIZE;
          scene.add(wall);
        }
      }
    }

    // Health cube
    healthcube = new t.Mesh(
      new t.CubeGeometry(30, 30, 30),
      new t.MeshBasicMaterial({map: t.ImageUtils.loadTexture('images/health.png')})
    );
    healthcube.position.set(-UNITSIZE - 15, 35, -UNITSIZE - 15);
    scene.add(healthcube);

    // Lighting
    var directionalLight1 = new t.DirectionalLight(0xF7EFBE, 0.7);
    directionalLight1.position.set(0.5, 1, 0.5);
    scene.add(directionalLight1);
    var directionalLight2 = new t.DirectionalLight(0xF7EFBE, 0.5);
    directionalLight2.position.set(-0.5, -1, -0.5);
    scene.add(directionalLight2);
  }

  _setupAI() {
    for (var i = 0; i < 16; i++) {
      this._addAI();
    }
  }

  _addAI() {
    var c = this._getMapSector(cam.position);
    var aiMaterial = new t.MeshBasicMaterial({color: 0xffffff});
    // map: t.ImageUtils.loadTexture('images/face.png')
    var o = new t.Mesh(aiGeo, aiMaterial);
    do {
      var x = this._getRandBetween(0, mapW - 1);
      var z = this._getRandBetween(0, mapH - 1);
    } while (map[x][z] > 0 || (x == c.x && z == c.z));
    x = Math.floor(x - mapW / 2) * UNITSIZE;
    z = Math.floor(z - mapW / 2) * UNITSIZE;
    o.position.set(x, UNITSIZE * 0.15, z);
    o.health = 100;
    o.pathPos = 1;
    o.lastRandomX = Math.random();
    o.lastRandomZ = Math.random();
    o.lastShot = Date.now(); // Higher-fidelity timers aren't a big deal here.
    ai.push(o);
    scene.add(o);
  }

  _checkWallCollision(v) {
    var c = this._getMapSector(v);
    return map[c.x][c.z] > 0;
  }

  _createBullet() {
    var sphere = new t.Mesh(sphereGeo, sphereMaterial);
    sphere.position.set(cam.position.x, cam.position.y * 0.8, cam.position.z);

    var vector = new t.Vector3(mouse.x, mouse.y, 1);
    vector.unproject(cam);
    sphere.ray = new t.Ray(
      cam.position,
      vector.sub(cam.position).normalize()
    );

    sphere.owner = cam;

    bullets.push(sphere);
    scene.add(sphere);

    return sphere;
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