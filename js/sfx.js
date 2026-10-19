(function (root) {
  const Sfx = {
    ctx: null,
    muted: false,
    setMuted: function (muted) {
      this.muted = !!muted;
    },
    unlock: function () {
      const AC = root.AudioContext || root.webkitAudioContext;
      if (!AC) return;
      if (!this.ctx) {
        try {
          this.ctx = new AC();
        } catch (err) {
          return;
        }
      }
      if (this.ctx.state === "suspended") {
        this.ctx.resume();
      }
    },
    tone: function (freq, dur, vol, delay, type) {
      if (this.muted) return;
      this.unlock();
      if (!this.ctx) return;
      const t = this.ctx.currentTime + (delay || 0);
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = type || "sine";
      osc.frequency.setValueAtTime(freq, t);
      gain.gain.setValueAtTime(0.0001, t);
      gain.gain.exponentialRampToValueAtTime(Math.max(0.0002, vol || 0.04), t + 0.012);
      gain.gain.exponentialRampToValueAtTime(0.0001, t + dur);
      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start(t);
      osc.stop(t + dur + 0.02);
    },
    pop: function () {
      this.tone(640, 0.07, 0.045);
    },
    tap: function () {
      this.tone(520, 0.05, 0.03);
    },
    place: function () {
      this.tone(490 + Math.random() * 70, 0.06, 0.035);
    },
    undo: function () {
      this.tone(420, 0.08, 0.035);
      this.tone(300, 0.1, 0.03, 0.05);
    },
    save: function () {
      this.tone(523, 0.1, 0.045);
      this.tone(784, 0.16, 0.04, 0.08);
    },
    surprise: function () {
      this.tone(523, 0.1, 0.04);
      this.tone(659, 0.12, 0.04, 0.07);
      this.tone(784, 0.16, 0.045, 0.14);
    },
    chime: function () {
      this.tone(523, 0.16, 0.04);
      this.tone(659, 0.18, 0.04, 0.06);
      this.tone(784, 0.22, 0.035, 0.12);
    },
    open: function () {
      this.tone(392, 0.12, 0.04);
      this.tone(523, 0.16, 0.04, 0.07);
      this.tone(659, 0.2, 0.035, 0.14);
    },
    animal: function () {
      this.tone(700, 0.08, 0.04);
      this.tone(880, 0.1, 0.035, 0.07);
    },
    bump: function () {
      this.tone(196, 0.09, 0.03, 0, "triangle");
    },
    step: function () {
      this.tone(240 + Math.random() * 30, 0.04, 0.015, 0, "triangle");
    }
  };

  root.Sfx = Sfx;
})(typeof globalThis !== "undefined" ? globalThis : this);
