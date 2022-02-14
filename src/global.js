// @ts-nocheck
window.game_hp = 100;
window.enemy_can_be_attacked = null;

export const updateGameHP = () => {
  const HPText = document.querySelector('#hp-text');
  HPText.setAttribute('value', `HP: ${window.game_hp}`);
};
