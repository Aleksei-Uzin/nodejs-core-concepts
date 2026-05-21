const EventEmitter = require('node:events');

class Timer extends EventEmitter {
  constructor(seconds) {
    super();
    this.seconds = seconds;
    this.remaining = seconds;
    this.isPaused = false;
    this.intId = null;
  }

  start() {
    if (this.intId !== null) {
      return;
    }

    this.intId = setInterval(() => {
      if (!this.isPaused) {
        this.emit('tick', this.remaining);
        this.remaining -= 1;

        if (this.remaining === 0) {
          clearInterval(this.intId);
          this.intId = null;
          this.emit('done');
        }
      }
    }, 1000);

    return this;
  }

  pause() {
    if (this.intId !== null) {
      this.isPaused = true;
      this.emit('paused', this.remaining);
    }

    return this;
  }

  resume() {
    if (this.intId !== null && this.isPaused) {
      this.isPaused = false;
      this.emit('resumed', this.remaining);
    }

    return this;
  }
}

module.exports = Timer;
