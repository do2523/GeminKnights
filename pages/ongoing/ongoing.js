document.addEventListener('DOMContentLoaded', () => {
  const slider = document.getElementById('time-slider');
  const timeDisplay = document.getElementById('time-display');
  const startButton = document.getElementById('start-button');
  const resetButton = document.getElementById('reset-button');
  const endButton = document.getElementById('end-button');

  let timerDuration = parseInt(slider.value, 10) * 60;

  // Check timer status when the page loads
  chrome.runtime.sendMessage({ type: 'getTimerStatus' }, (response) => {
    if (response) {
      const minutes = Math.floor(response.remainingTime / 60);
      const seconds = response.remainingTime % 60;
      timeDisplay.textContent = `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
      slider.value = Math.ceil(response.remainingTime / 60);
      timerDuration = response.remainingTime;
    }
  });

  // Update the timer display when the slider value changes
  slider.addEventListener('input', () => {
    const minutes = slider.value;
    timeDisplay.textContent = `${minutes} min`;
    timerDuration = parseInt(slider.value, 10) * 60;
  });

  // Start the timer
  startButton.addEventListener('click', () => {
    chrome.runtime.sendMessage({ type: 'startTimer', duration: timerDuration }, (response) => {
      if (response && response.status) {
        console.log(response.status);
      } else {
        console.error('Failed to start timer.');
      }
    });
  });

  // Reset the timer
  resetButton.addEventListener('click', () => {
    chrome.runtime.sendMessage({ type: 'resetTimer', duration: timerDuration }, (response) => {
      if (response && response.status) {
        console.log(response.status);
        timeDisplay.textContent = `${slider.value} min`;
      } else {
        console.error('Failed to reset timer.');
      }
    });
  });

  // Stop the session button handler
  endButton.addEventListener('click', () => {
    // Just open finalreport.html - don't end session yet
    chrome.windows.create({
      url: chrome.runtime.getURL('pages/finalreport/finalreport.html'),
      type: 'popup',
      width: 400,
      height: 600,
    });
    
    // Session will be ended when user clicks Continue in finalreport.html
  });

  // Periodically check timer status
  setInterval(() => {
    chrome.runtime.sendMessage({ type: 'getTimerStatus' }, (response) => {
      if (response) {
        const minutes = Math.floor(response.remainingTime / 60);
        const seconds = response.remainingTime % 60;
        timeDisplay.textContent = `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
      }
    });
  }, 1000);
});