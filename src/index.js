import { Enemy } from './enemy';
import './components';
setTimeout(() => {
  const enemy = new Enemy();
  enemy.init();
  enemy.attack();
}, 1000);
