const carElement = document.getElementById('f1-car');
const timerDisplay = document.getElementById('timer-display');
const closeBtn = document.getElementById('close-btn');

// Close button handler
closeBtn.addEventListener('click', () => {
  if (window.electron) {
    window.electron.quitApp();
  }
});

// Function to update timer display
function updateTimerDisplay(minutes, seconds) {
  const mins = String(minutes).padStart(2, '0');
  const secs = String(seconds).padStart(2, '0');
  timerDisplay.textContent = `${mins}:${secs}`;
}

// Function to animate car movement
function animateCar() {
  carElement.classList.add('car-moving');
  
  setTimeout(() => {
    carElement.classList.remove('car-moving');
  }, 2000);
}

// Export for timer.js to use
window.appUI = {
  updateTimerDisplay,
  animateCar
};