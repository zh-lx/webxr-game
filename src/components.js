// @ts-nocheck
const scene = document.querySelector('a-scene');

const attack = function (position) {
  const circle = document.createElement('a-sphere');
  circle.setAttribute('radius', '0.2');
  circle.setAttribute('color', 'red');
  circle.setAttribute('position', '0 1 0');
  circle.setAttribute(
    'animation',
    `property: position; dur: 300; to: ${position.x} ${position.y} ${position.z};`
  );
  scene.appendChild(circle);
};

AFRAME.registerComponent('cursor-listener', {
  schema: {},

  init: function () {
    // Do something when component first attached.
    this.el.addEventListener('click', function (evt) {
      attack(evt.detail.intersection.point);
    });
  },

  update: function () {
    // Do something when component's data is updated.
  },

  remove: function () {
    // Do something the component or its entity is detached.
  },

  tick: function (time, timeDelta) {
    // Do something on every scene tick or frame.
  },
});

AFRAME.registerComponent('can-be-attacked', {
  schema: {},

  init: function () {
    // Do something when component first attached.
    this.el.addEventListener('mouseenter', () => {
      window.enemy_can_be_attacked = this.el;
    });
    this.el.addEventListener('mouseleave', () => {
      window.enemy_can_be_attacked = null;
    });
  },

  update: function () {
    // Do something when component's data is updated.
  },

  remove: function () {
    // Do something the component or its entity is detached.
  },

  tick: function (time, timeDelta) {
    // Do something on every scene tick or frame.
  },
});
