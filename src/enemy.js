import { enemies } from './constant';
import { updateGameHP } from './global';
// scene
const scene = document.querySelector('a-scene');

export class Enemy {
  constructor() {
    this.person = createRandomEnemy();
    this.location = createRandomLocation();
    this.entity = this.createEntity();
    this.attackTimer = null;
  }

  init() {
    // 挂载实体
    scene?.appendChild(this.entity);
    this.attackTimer = setInterval(
      () => this.attack(),
      this.person.attack.delay * 1000
    );
  }

  // 生成实体
  createEntity() {
    const entity = document.createElement('a-gltf-model');
    entity.setAttribute('src', `#${this.person.name}`);
    entity.setAttribute('scale', `${this.person.scale}`);
    entity.setAttribute(
      'position',
      `${this.location.x} ${this.location.y} ${this.location.z}`
    );
    entity.setAttribute(
      'rotation',
      `${this.location.degX} ${this.location.degY} ${this.location.degZ}`
    );
    return entity;
  }

  // 攻击
  attack() {
    const attackEntity = this.createAttackEntity();
    scene?.appendChild(attackEntity);
    const timer = setTimeout(() => {
      // @ts-ignore
      window.game_hp -= this.person.attack.hurt;
      updateGameHP();
      scene?.removeChild(attackEntity);
      clearTimeout(timer);
    }, 1000);
  }

  // 生成攻击实体
  createAttackEntity() {
    const entity = document.createElement('a-gltf-model');
    entity.setAttribute('src', `#${this.person.name}-attack`);
    entity.setAttribute('scale', `${this.person.attack.scale}`);
    entity.setAttribute(
      'position',
      `${this.location.x} 1.5 ${this.location.z}`
    );
    entity.setAttribute(
      'rotation',
      `${this.location.degX} ${this.location.degY} ${this.location.degZ}`
    );
    entity.setAttribute(
      'animation',
      'property: position; dur: 1000; to: 0 1.5 0;'
    );
    return entity;
  }
}

// 生成随机敌人
const createRandomEnemy = () => {
  const index = Math.floor(Math.random() * enemies.length);
  return enemies[index];
};

// 生成随机位置
const createRandomLocation = () => {
  const x =
    (Math.floor(Math.random() * 5) + 3) * (Math.random() < 0.5 ? 1 : -1);
  const z =
    (Math.floor(Math.random() * 5) + 3) * (Math.random() < 0.5 ? 1 : -1);
  const deg = getEnemyRotateDeg(x, z);
  return { x, y: 0, z, degX: 0, degY: deg, degZ: 0 };
};

// 根据 x，z 获得敌人需要旋转的角度
const getEnemyRotateDeg = (x, z) => {
  const tan = x / z;
  const deg = Math.round(Math.atan(tan) / (Math.PI / 180));
  return z > 0 ? 180 + deg : deg;
};
