(() => {
  "use strict";
  const t = (t, e = "log") => {
      "error" === e
        ? console && "function" == typeof console.error && console.error(t)
        : console && "function" == typeof console.info && console.info(t);
    },
    e = (e) => t(e, "error"),
    n = () =>
      (navigator.getGamepads && "function" == typeof navigator.getGamepads) ||
      (navigator.getGamepads &&
        "function" == typeof navigator.webkitGetGamepads) ||
      !1,
    o = "Invalid property.",
    i = "Invalid value. It must be a number between 0.00 and 1.00.",
    s = "Button does not exist.",
    a = "Unknown event name.",
    c = function(t) {
      let n = {
        id: t.index,
        buttons: t.buttons.length,
        axes: Math.floor(t.axes.length / 2),
        axeValues: [],
        axeThreshold: [1],
        hapticActuator: null,
        vibrationMode: -1,
        vibration: !1,
        mapping: t.mapping,
        buttonActions: {},
        axesActions: {},
        pressed: {},
        set: function(t, n) {
          if (["axeThreshold"].indexOf(t) >= 0) {
            if ("axeThreshold" === t && (!parseFloat(n) || n < 0 || n > 1))
              return void e(i);
            this[t] = n;
          } else e(o);
        },
        vibrate: function(t = 0.75, e = 500) {
          if (this.hapticActuator)
            switch (this.vibrationMode) {
              case 0:
                return this.hapticActuator.pulse(t, e);
              case 1:
                return this.hapticActuator.playEffect("dual-rumble", {
                  duration: e,
                  strongMagnitude: t,
                  weakMagnitude: t,
                });
            }
        },
        triggerDirectionalAction: function(t, e, n, o, i) {
          n && o % 2 === i
            ? (this.pressed[`${t}${e}`] ||
                ((this.pressed[`${t}${e}`] = !0),
                this.axesActions[e][t].before()),
              this.axesActions[e][t].action())
            : this.pressed[`${t}${e}`] &&
              o % 2 === i &&
              (delete this.pressed[`${t}${e}`], this.axesActions[e][t].after());
        },
        checkStatus: function() {
          let t = {};
          const e = navigator.getGamepads
            ? navigator.getGamepads()
            : navigator.webkitGetGamepads
            ? navigator.webkitGetGamepads()
            : [];
          if (e.length) {
            if (((t = e[this.id]), t.buttons))
              for (let e = 0; e < this.buttons; e++)
                !0 === t.buttons[e].pressed
                  ? (this.pressed[`button${e}`] ||
                      ((this.pressed[`button${e}`] = !0),
                      this.buttonActions[e].before()),
                    this.buttonActions[e].action())
                  : this.pressed[`button${e}`] &&
                    (delete this.pressed[`button${e}`],
                    this.buttonActions[e].after());
            if (t.axes) {
              const e = t.axes.length % 2;
              for (let n = 0; n < 2 * this.axes; n++) {
                const o = t.axes[n + e].toFixed(4),
                  i = Math.floor(n / 2);
                (this.axeValues[i][n % 2] = o),
                  this.triggerDirectionalAction(
                    "right",
                    i,
                    o >= this.axeThreshold[0],
                    n,
                    0
                  ),
                  this.triggerDirectionalAction(
                    "left",
                    i,
                    o <= -this.axeThreshold[0],
                    n,
                    0
                  ),
                  this.triggerDirectionalAction(
                    "down",
                    i,
                    o >= this.axeThreshold[0],
                    n,
                    1
                  ),
                  this.triggerDirectionalAction(
                    "up",
                    i,
                    o <= -this.axeThreshold[0],
                    n,
                    1
                  );
              }
            }
          }
        },
        associateEvent: function(t, n, o) {
          if (t.match(/^button\d+$/)) {
            const i = parseInt(t.match(/^button(\d+)$/)[1]);
            i >= 0 && i < this.buttons ? (this.buttonActions[i][o] = n) : e(s);
          } else if ("start" === t) this.buttonActions[9][o] = n;
          else if ("select" === t) this.buttonActions[8][o] = n;
          else if ("r1" === t) this.buttonActions[5][o] = n;
          else if ("r2" === t) this.buttonActions[7][o] = n;
          else if ("l1" === t) this.buttonActions[4][o] = n;
          else if ("l2" === t) this.buttonActions[6][o] = n;
          else if ("power" === t)
            this.buttons >= 17 ? (this.buttonActions[16][o] = n) : e(s);
          else if (t.match(/^(up|down|left|right)(\d+)$/)) {
            const i = t.match(/^(up|down|left|right)(\d+)$/),
              a = i[1],
              c = parseInt(i[2]);
            c >= 0 && c < this.axes ? (this.axesActions[c][a][o] = n) : e(s);
          } else if (t.match(/^(up|down|left|right)$/)) {
            const e = t.match(/^(up|down|left|right)$/)[1];
            this.axesActions[0][e][o] = n;
          }
          return this;
        },
        on: function(t, e) {
          return this.associateEvent(t, e, "action");
        },
        off: function(t) {
          return this.associateEvent(t, function() {}, "action");
        },
        after: function(t, e) {
          return this.associateEvent(t, e, "after");
        },
        before: function(t, e) {
          return this.associateEvent(t, e, "before");
        },
      };
      for (let t = 0; t < n.buttons; t++)
        n.buttonActions[t] = {
          action: () => {},
          after: () => {},
          before: () => {},
        };
      for (let t = 0; t < n.axes; t++)
        (n.axesActions[t] = {
          down: { action: () => {}, after: () => {}, before: () => {} },
          left: { action: () => {}, after: () => {}, before: () => {} },
          right: { action: () => {}, after: () => {}, before: () => {} },
          up: { action: () => {}, after: () => {}, before: () => {} },
        }),
          (n.axeValues[t] = [0, 0]);
      return (
        t.hapticActuators
          ? "function" == typeof t.hapticActuators.pulse
            ? ((n.hapticActuator = t.hapticActuators),
              (n.vibrationMode = 0),
              (n.vibration = !0))
            : t.hapticActuators[0] &&
              "function" == typeof t.hapticActuators[0].pulse &&
              ((n.hapticActuator = t.hapticActuators[0]),
              (n.vibrationMode = 0),
              (n.vibration = !0))
          : t.vibrationActuator &&
            "function" == typeof t.vibrationActuator.playEffect &&
            ((n.hapticActuator = t.vibrationActuator),
            (n.vibrationMode = 1),
            (n.vibration = !0)),
        n
      );
    },
    r = {
      gamepads: {},
      axeThreshold: [1],
      isReady: n(),
      onConnect: function() {},
      onDisconnect: function() {},
      onBeforeCycle: function() {},
      onAfterCycle: function() {},
      getGamepads: function() {
        return this.gamepads;
      },
      getGamepad: function(t) {
        return this.gamepads[t] ? this.gamepads[t] : null;
      },
      set: function(t, n) {
        if (["axeThreshold"].indexOf(t) >= 0) {
          if ("axeThreshold" === t && (!parseFloat(n) || n < 0 || n > 1))
            return void e(i);
          if (((this[t] = n), "axeThreshold" === t)) {
            const t = this.getGamepads(),
              e = Object.keys(t);
            for (let n = 0; n < e.length; n++)
              t[e[n]].set("axeThreshold", this.axeThreshold);
          }
        } else e(o);
      },
      checkStatus: function() {
        const t =
            window.requestAnimationFrame || window.webkitRequestAnimationFrame,
          e = Object.keys(r.gamepads);
        r.onBeforeCycle();
        for (let t = 0; t < e.length; t++) r.gamepads[e[t]].checkStatus();
        r.onAfterCycle(), e.length > 0 && t(r.checkStatus);
      },
      init: function() {
        window.addEventListener("gamepadconnected", (e) => {
          const n = e.gamepad || e.detail.gamepad;
          if (
            (t("Gamepad detected."),
            window.gamepads || (window.gamepads = {}),
            n)
          ) {
            if (!window.gamepads[n.index]) {
              window.gamepads[n.index] = n;
              const t = c(n);
              t.set("axeThreshold", this.axeThreshold),
                (this.gamepads[t.id] = t),
                this.onConnect(this.gamepads[t.id]);
            }
            1 === Object.keys(this.gamepads).length && this.checkStatus();
          }
        }),
          window.addEventListener("gamepaddisconnected", (e) => {
            const n = e.gamepad || e.detail.gamepad;
            t("Gamepad disconnected."),
              n &&
                (delete window.gamepads[n.index],
                delete this.gamepads[n.index],
                this.onDisconnect(n.index));
          });
      },
      on: function(t, n) {
        switch (t) {
          case "connect":
            this.onConnect = n;
            break;
          case "disconnect":
            this.onDisconnect = n;
            break;
          case "beforeCycle":
          case "beforecycle":
            this.onBeforeCycle = n;
            break;
          case "afterCycle":
          case "aftercycle":
            this.onAfterCycle = n;
            break;
          default:
            e(a);
        }
        return this;
      },
      off: function(t) {
        switch (t) {
          case "connect":
            this.onConnect = function() {};
            break;
          case "disconnect":
            this.onDisconnect = function() {};
            break;
          case "beforeCycle":
          case "beforecycle":
            this.onBeforeCycle = function() {};
            break;
          case "afterCycle":
          case "aftercycle":
            this.onAfterCycle = function() {};
            break;
          default:
            e(a);
        }
        return this;
      },
    };
  r.init();
  const h = r;
  n()
    ? (window.gameControl = h)
    : e("Your web browser does not support the Gamepad API.");
})();
