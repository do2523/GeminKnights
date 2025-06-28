document.addEventListener('DOMContentLoaded', () => {
  const slider = document.getElementById('time-slider');
  const timeDisplay = document.getElementById('time-display');
  const startStopButton = document.getElementById('start-stop-button');
  const resetButton = document.getElementById('reset-button');
  const sessionNameInput = document.getElementById('session-name');

  let countdownInterval;
  let isTimerRunning = false;
  let remainingTime;

  // Update the timer display when the slider value changes
  slider.addEventListener('input', () => {
    const minutes = slider.value;
    timeDisplay.textContent = `${minutes} min`;
    remainingTime = parseInt(slider.value, 10) * 60; // Update remaining time
  });

  // Start/Stop Timer functionality
  startStopButton.addEventListener('click', () => {
    if (isTimerRunning) {
      clearInterval(countdownInterval);
      isTimerRunning = false;
      startStopButton.textContent = 'Start Timer';
    } else {
      if (!remainingTime) {
        remainingTime = parseInt(slider.value, 10) * 60; // Initialize remaining time
      }
      countdownInterval = setInterval(() => {
        if (remainingTime <= 0) {
          clearInterval(countdownInterval);
          alert('Timer completed!');
          isTimerRunning = false;
          startStopButton.textContent = 'Start Timer';
        } else {
          remainingTime--;
          const minutes = Math.floor(remainingTime / 60);
          const seconds = remainingTime % 60;
          timeDisplay.textContent = `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
        }
      }, 1000);
      isTimerRunning = true;
      startStopButton.textContent = 'Stop Timer';
    }
  });

  // Reset Session functionality
  resetButton.addEventListener('click', () => {
    clearInterval(countdownInterval);
    isTimerRunning = false;
    startStopButton.textContent = 'Start Timer';
    remainingTime = parseInt(slider.value, 10) * 60; // Reset remaining time
    timeDisplay.textContent = `${slider.value} min`;
  });
});