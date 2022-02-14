import { Enemy } from './enemy';
import { EnemyGenerateDelay } from './constant';

let enemyGenerator = null;

const restartText = document.querySelector('#restart-text');
const gameOverSound = document.querySelector('#gameover_sound_player');
const scene = document.querySelector('a-scene');

export const updateGameHP = () => {
  const text = document.querySelector('#hp-text');
  // @ts-ignore
  text?.setAttribute('value', `HP: ${window.GameHP > 0 ? window.GameHP : 0}`);
};

export const hideGameHP = () => {
  const text = document.querySelector('#hp-text');
  text?.setAttribute('value', '');
};

export const updateGameScore = () => {
  const text = document.querySelector('#score-text');
  // @ts-ignore
  text?.setAttribute('value', `Score: ${window.GameScore}`);
};

export const hideStart = () => {
  const text = document.querySelector('#start-text');
  text?.setAttribute('value', '');
};

export const hideRestart = () => {
  // @ts-ignore
  scene?.removeChild(restartText);
};

export const showRestart = () => {
  // @ts-ignore
  scene?.appendChild(restartText);
};

export const hideGameOver = () => {
  const text = document.querySelector('#end-text');
  text?.setAttribute('value', '');
};

export const showGameOver = () => {
  const text = document.querySelector('#end-text');
  text?.setAttribute('value', 'Game Over!');
};

export const startGame = () => {
  hideStart();
  updateGameHP();
  updateGameScore();
  enemyGenerator = setInterval(() => {
    const enemy = new Enemy();
    enemy.init();
    enemy.attack();
  }, EnemyGenerateDelay);
};

export const restartGame = () => {
  hideRestart();
  hideGameOver();
  // @ts-ignore
  window.GameHP = 100;
  // @ts-ignore
  window.GameScore = 0;
  updateGameHP();
  updateGameScore();
  enemyGenerator = setInterval(() => {
    const enemy = new Enemy();
    enemy.init();
    enemy.attack();
  }, EnemyGenerateDelay);
};

export const endGame = () => {
  clearInterval(enemyGenerator);
  enemyGenerator = null;
  // @ts-ignore
  window.EnemyMap.forEach((enemy, key) => {
    enemy.destroy();
  });
  // @ts-ignore
  gameOverSound.components.sound.playSound();
  hideGameHP();
  showGameOver();
  showRestart();
};

hideRestart();
