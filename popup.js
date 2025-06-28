document.addEventListener('DOMContentLoaded', () => {
  const slider = document.getElementById('time-slider');
  const timeDisplay = document.getElementById('time-display');

  slider.addEventListener('input', () => {
    const minutes = slider.value;
    timeDisplay.textContent = `${minutes} min`;
  });

  const startButton = document.getElementById('start-button');
  startButton.addEventListener('click', () => {
    const sessionName = document.getElementById('session-name').value || 'Unnamed Session';
    const timerDuration = slider.value;
    alert(`Starting "${sessionName}" for ${timerDuration} minutes.`);
  });
});console.log('This is a popup!');