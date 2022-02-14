import { Enemies, Hurt } from './constant';
import { updateGameHP, updateGameScore, endGame } from './game';
// scene
const scene = document.querySelector('a-scene');

const enemyDeathSound = document.querySelector('#enemy_death_sound_player');

export class Enemy {
  constructor() {
    this.person = createRandomEnemy();
    this.location = createRandomLocation();
    this.entity = this.createEntity();
    this.sounds = {
      hit: this.createShootSound(),
      appear: this.createAppearSound(),
    };
    this.attackTimer = null;
    this.destroyed = false;
  }

  init() {
    // 挂载实体
    this.entity.appendChild(this.sounds.hit);
    this.entity.appendChild(this.sounds.appear);
    scene?.appendChild(this.entity);
    setTimeout(() => {
      // @ts-ignore
      this.sounds.appear.components.sound.playSound();
    }, 0);
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
    entity.setAttribute('can-be-attacked', '');
    // @ts-ignore
    window.EnemyMap.set(entity, this);
    return entity;
  }

  // 创建声音
  createShootSound() {
    const sound = document.createElement('a-entity');
    sound.setAttribute('sound', 'src: #hit-sound');
    sound.setAttribute('position', '0 0 0');
    sound.setAttribute('poolSize', '10');
    return sound;
  }
  createAppearSound() {
    const sound = document.createElement('a-entity');
    sound.setAttribute('sound', 'src: #enemy-appear-sound');
    sound.setAttribute('position', '0 0 0');
    sound.setAttribute('poolSize', '10');
    return sound;
  }

  // 攻击
  attack() {
    const attackEntity = this.createAttackEntity();
    scene?.appendChild(attackEntity);
    const timer = setTimeout(() => {
      // @ts-ignore
      if (window.GameHP <= 0) {
        return;
      }
      // @ts-ignore
      window.GameHP -= this.person.attack.hurt;
      updateGameHP();
      // @ts-ignore
      if (window.GameHP <= 0) {
        endGame();
      }
      scene?.removeChild(attackEntity);
      clearTimeout(timer);
    }, 1000);
  }

  // 被攻击
  beAttacked() {
    if (this.destroyed) {
      return;
    }
    // @ts-ignore
    this.sounds.hit.components.sound.playSound();
    this.person.hp -= Hurt;
    if (this.person.hp <= 0) {
      // @ts-ignore
      enemyDeathSound.components.sound.playSound();
      this.destroy();
      // @ts-ignore
      window.GameScore += this.person.score;
      updateGameScore();
    }
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

  // 销毁
  destroy() {
    this.destroyed = true;
    if (this.attackTimer) {
      clearInterval(this.attackTimer);
      this.attackTimer = null;
    }
    // @ts-ignore
    window.EnemyMap.delete(this.entity);
    scene?.removeChild(this.entity);
  }
}

// 生成随机敌人
const createRandomEnemy = () => {
  const index = Math.floor(Math.random() * Enemies.length);
  return JSON.parse(JSON.stringify(Enemies[index]));
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
