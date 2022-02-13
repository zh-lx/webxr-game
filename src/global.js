// @ts-nocheck
window.game_hp = 100;

export const updateGameHP = () => {
  const HPText = document.querySelector('#hp-text');
  HPText.setAttribute('value', `HP: ${window.game_hp}`);
};
