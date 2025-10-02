const MOVE_INTERVAL = 5 * 60 * 1000; // 5 minutes in milliseconds (adjust as needed)

class ProductivityTimer {
  constructor() {
    this.elapsed = 0;
    this.interval = null;
    this.moveInterval = null;
  }

  start() {
    // Update display every second
    this.interval = setInterval(() => {
      this.elapsed++;
      const minutes = Math.floor(this.elapsed / 60);
      const seconds = this.elapsed % 60;
      
      if (window.appUI) {
        window.appUI.updateTimerDisplay(minutes, seconds);
      }
    }, 1000);

    // Trigger car movement at intervals
    this.moveInterval = setInterval(() => {
      if (window.appUI) {
        window.appUI.animateCar();
      }
      console.log('Car moved! Keep working!');
    }, MOVE_INTERVAL);
  }

  stop() {
    if (this.interval) {
      clearInterval(this.interval);
    }
    if (this.moveInterval) {
      clearInterval(this.moveInterval);
    }
  }

  reset() {
    this.stop();
    this.elapsed = 0;
    if (window.appUI) {
      window.appUI.updateTimerDisplay(0, 0);
    }
  }
}

// Initialize and start timer when page loads
const timer = new ProductivityTimer();

window.addEventListener('DOMContentLoaded', () => {
  timer.start();
  console.log('F1 Productivity Timer Started!');
});