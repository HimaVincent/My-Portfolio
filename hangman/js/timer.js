export function formatTime(seconds) {
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  const paddedMins = String(mins).padStart(2, "0");
  const paddedSecs = String(secs).padStart(2, "0");
  return `${paddedMins}:${paddedSecs}`;
}

export class GameTimer {
  constructor() {
    this.elapsedSeconds = 0;
    this.timerInterval = null;
  }

  start(onTick) {
    this.reset();
    this.timerInterval = setInterval(() => {
      this.elapsedSeconds++;
      if (onTick) {
        onTick(this.elapsedSeconds);
      }
    }, 1000);
  }

  stop() {
    if (this.timerInterval) {
      clearInterval(this.timerInterval);
      this.timerInterval = null;
    }
  }

  reset() {
    this.stop();
    this.elapsedSeconds = 0;
  }

  getElapsedSeconds() {
    return this.elapsedSeconds;
  }

  getFormattedTime() {
    return formatTime(this.elapsedSeconds);
  }
}
