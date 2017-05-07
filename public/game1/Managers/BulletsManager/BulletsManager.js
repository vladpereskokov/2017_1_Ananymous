import threeFactory from '../../Three/ThreeFactory/ThreeFactory';
import meshManager from '../MeshManager/MeshManager';
import sceneManager from '../SceneManager/SceneManager';
import Bullet from "../../Three/Objects/Bullet/Bullet";

class BulletsManager {
  constructor() {
    this._bullets = [];
  }

  shoot(player, x, y) {
    if (player._canShoot > 0) {
      const bullet = new Bullet(0x0000ff, 0.05, 8, 8).getBullet;

      bullet.position.set(
        meshManager.meshes["playerweapon"].position.x,
        meshManager.meshes["playerweapon"].position.y + 0.15,
        meshManager.meshes["playerweapon"].position.z
      );

      bullet.velocity = threeFactory.vector3D(
        -Math.sin(y),
        Math.sin(x),
        -Math.cos(y)
      );

      bullet.alive = true;

      setTimeout(() => {
        bullet.alive = false;
        sceneManager.remove(bullet);
        player._canShoot += 1;
      }, 1000);

      this._bullets.push(bullet);
      sceneManager.add(bullet);
      player._canShoot -= 1;
    }
  }

  bulletsService() {
    for (let index = 0; index < this._bullets.length; ++index) {
      if (this._bullets[index]) {
        if (!this._bullets[index].alive) {
          this._bullets.splice(index, 1);

          continue;
        }

        this._bullets[index].position.add(this._bullets[index].velocity);
      }
    }
  }
}

const bulletsManager = new BulletsManager();

export default bulletsManager;
