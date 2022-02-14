export const Enemies = [
  {
    name: 'druid',
    scale: '1.3 1.3 1.3',
    attack: {
      scale: '0.1 0.1 0.1',
      hurt: 10,
      delay: 9,
    },
    hp: 60,
    score: 8,
  },
  {
    name: 'korrigan-hat',
    scale: '4 4 4',
    attack: {
      scale: '0.05 0.05 0.05',
      hurt: 7,
      delay: 7,
    },
    hp: 50,
    score: 6,
  },
  {
    name: 'ankou-with-cart',
    scale: '0.8 0.8 0.8',
    attack: {
      scale: '0.1 0.1 0.1',
      hurt: 8,
      delay: 8,
    },
    hp: 100,
    score: 10,
  },
  {
    name: 'witch',
    scale: '1 1 1',
    attack: {
      scale: '0.1 0.1 0.1',
      hurt: 6,
      delay: 5,
    },
    hp: 40,
    score: 5,
  },
  {
    name: 'bear',
    scale: '1 1 1',
    attack: {
      scale: '0.1 0.1 0.1',
      hurt: 5,
      delay: 5,
    },
    hp: 60,
    score: 7,
  },
  {
    name: 'korrigan-wolf',
    scale: '3 3 3',
    attack: {
      scale: '0.06 0.06 0.06',
      hurt: 5,
      delay: 6,
    },
    hp: 80,
    score: 7,
  },
];

export const Hurt = 15; // 角色攻击伤害
export const AttackDelay = 300; // 角色攻击间隔
export const EnemyGenerateDelay = 3000; // 敌人生成间隔
