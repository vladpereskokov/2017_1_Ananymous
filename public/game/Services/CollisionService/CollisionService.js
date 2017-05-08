import map from '../../Tools/Map/Map';
import Helper from "../../Tools/Helper/Helper";
import { DAMAGE } from '../../Constants/Constants';

export default class CollisionService {
  static collisionBulletWithWall(position) {
    return Helper.checkWallCollision(position);
  }

  static collisionBulletWithAi(scene, playersService, bulletsService, bullet,
                               bulletPosition, bulletNumber) {
    let hit = false;

    for (let j in playersService.all) {
      const player = playersService.getPlayer(j);

      const vertices = player.object.geometry.vertices[0];
      const playerPosition = player.object.position;

      const x = Math.abs(vertices.x);
      const z = Math.abs(vertices.z);

      if (bulletPosition.x < playerPosition.x + x &&
        bulletPosition.x > playerPosition.x - x &&
        bulletPosition.z < playerPosition.z + z &&
        bulletPosition.z > playerPosition.z - z &&
        bullet.owner !== player.object) {

        bulletsService.remove(bulletNumber);
        scene.remove(bullet.object);
        player.health = player.health - DAMAGE;

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

    return hit;
  }
}
