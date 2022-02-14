AFRAME.registerComponent('cursor-listener', {
  schema: {},

  init: function () {
    // Do something when component first attached.
    this.el.addEventListener('click', function (evt) {
      console.log(evt);
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
      console.log('can be attack');
    });
    this.el.addEventListener('mouseleave', () => {
      console.log('cant be attack');
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
