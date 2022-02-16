/**
 * 角色攻击相关逻辑
 */
import { AttackDelay } from './constant';
import { startGame, restartGame } from './game';

const scene = document.querySelector('a-scene');
const shootingSoundPlayer = document.querySelector('#shooting_sound_player');

export const attack = function (point) {
  attackEntity();
  createAttackEntity(point);
};

// 创建攻击实体
function createAttackEntity(point) {
  const { newX, newY, newZ } = getPosition(point);
  const attackEntity = document.createElement('a-sphere');
  attackEntity.setAttribute('radius', '0.2');
  attackEntity.setAttribute('color', 'red');
  attackEntity.setAttribute('position', `${newX} ${newY} ${newZ}`);
  attackEntity.setAttribute(
    'animation',
    `property: position; dur: ${AttackDelay}; to: ${point.x} ${point.y} ${point.z};`
  );
  scene?.appendChild(attackEntity);
  destroyAttackEntity(scene, attackEntity);
}

// 销毁实体
function destroyAttackEntity(parent, entity) {
  const timer = setTimeout(() => {
    parent.removeChild(entity);
    clearTimeout(timer);
  }, AttackDelay);
}

// 发射子弹
function attackEntity() {
  // 声音
  // @ts-ignore
  shootingSoundPlayer?.components.sound.playSound();
  // @ts-ignore
  const entity = window.CursorFocusEntity;
  if (entity === 'start') {
    const timer = setTimeout(() => {
      // @ts-ignore
      window.CursorFocusEntity = null;
      startGame();
      clearTimeout(timer);
    }, AttackDelay);
  } else if (entity === 'restart') {
    const timer = setTimeout(() => {
      // @ts-ignore
      window.CursorFocusEntity = null;
      restartGame();
      clearTimeout(timer);
    }, AttackDelay);
  } else if (entity) {
    attackEnemy(entity);
  }
}

// 播放声音

// 对敌人造成伤害
function attackEnemy(enemyEntity) {
  // @ts-ignore
  const enemy = window.EnemyMap.get(enemyEntity);
  const timer = setTimeout(() => {
    enemy.beAttacked();
    clearTimeout(timer);
  }, AttackDelay);
}

// 获取子弹初始发射位置
function getPosition(point) {
  const { x, y, z } = point;
  // x, z 平面的角度
  const tanXZ = x / z;
  const degXZ =
    z > 0
      ? 180 + Math.round(Math.atan(tanXZ) / (Math.PI / 180))
      : Math.round(Math.atan(tanXZ) / (Math.PI / 180));
  // y, z 平面的角度
  // @ts-ignore
  const tanYZ = (y - window.InitHeight) / Math.abs(z);
  const degYZ = Math.round(Math.atan(tanYZ) / (Math.PI / 180));
  // 计算新的子弹发射位置
  const { newX, newY: newZ } = getPointByDegRotate(
    { x: 0, y: 0 },
    { x1: 0.5, y1: -2 },
    (-degXZ * Math.PI) / 180
  );
  const { newX: newY } = getPointByDegRotate(
    // @ts-ignore
    { x: window.InitHeight, y: 0 },
    { x1: 1.3, y1: -2 },
    (degYZ * Math.PI) / 180
  );
  return { newX, newZ, newY };
}

function getPointByDegRotate(basePoint, oldPoint, radian) {
  const { x, y } = basePoint;
  const { x1, y1 } = oldPoint;
  const newX = (x1 - x) * Math.cos(radian) - (y1 - y) * Math.sin(radian) + x;
  const newY = (y1 - y) * Math.cos(radian) + (x1 - x) * Math.sin(radian) + y;
  return { newX, newY };
}
