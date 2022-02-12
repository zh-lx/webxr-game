export const createEnemyAttack = (enemy_id) => {
  const attack = document.createElement('a-box');
  attack.setAttribute('height', '0.2');
  attack.setAttribute('width', '0.2');
  attack.setAttribute('color', 'red');
  const animation = createAttackAnimation();
  attack.appendChild(animation);
  const enemy = document.querySelector('#' + enemy_id);
  enemy.appendChild(attack);
  console.log(enemy.getAttribute('position'));
};

// 子弹攻击动画
export const createAttackAnimation = () => {
  const animation = document.createElement('a-animation');
  animation.setAttribute('attribute', 'position');
  animation.setAttribute('dur', '2000');
  animation.setAttribute('to', '0 -2 10');
  return animation;
};
