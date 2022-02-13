import { Enemy } from './enemy';
import './cursor-event';
setTimeout(() => {
  const enemy = new Enemy();
  enemy.init();
  enemy.attack();
}, 1000);
