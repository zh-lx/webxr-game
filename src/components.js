// @ts-nocheck
import { attack } from './attack';

AFRAME.registerComponent('cursor-listener', {
  schema: {},

  init: function () {
    // 点击进行攻击
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
      window.CursorFocusEntity = this.el;
    });
    this.el.addEventListener('mouseleave', () => {
      window.CursorFocusEntity = null;
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

AFRAME.registerComponent('start-focus', {
  init: function () {
    this.el.addEventListener('mouseenter', function () {
      if (window.startLeaveTimer) {
        clearTimeout(window.startLeaveTimer);
        window.startLeaveTimer = null;
      }
      window.CursorFocusEntity = 'start';
      this.setAttribute('scale', '12 12 12');
      this.setAttribute('color', 'orange');
    });

    this.el.addEventListener('mouseleave', function () {
      window.startLeaveTimer = setTimeout(() => {
        window.CursorFocusEntity = null;
        this.setAttribute('scale', '10 10 10');
        this.setAttribute('color', '#bbb');
      }, 500);
    });
  },
});

AFRAME.registerComponent('restart-focus', {
  init: function () {
    this.el.addEventListener('mouseenter', function () {
      console.log(111);
      if (window.restartLeaveTimer) {
        clearTimeout(window.restartLeaveTimer);
        window.restartLeaveTimer = null;
      }
      window.CursorFocusEntity = 'restart';
      this.setAttribute('scale', '12 12 12');
      this.setAttribute('color', 'orange');
    });

    this.el.addEventListener('mouseleave', function () {
      window.restartLeaveTimer = setTimeout(() => {
        window.CursorFocusEntity = null;
        this.setAttribute('scale', '10 10 10');
        this.setAttribute('color', '#bbb');
      }, 500);
    });
  },
});
