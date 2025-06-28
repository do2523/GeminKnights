document.addEventListener('DOMContentLoaded', () => {
  const reflectionList = document.getElementById('reflection-list');
  const continueButton = document.getElementById('continue-button');

  // Get the reflections from the current session
  chrome.runtime.sendMessage({ type: 'getTimerStatus' }, (response) => {
    if (response && response.reflections && response.reflections.length > 0) {
      // Dynamically populate reflections
      response.reflections.forEach((reflection, index) => {
        const reflectionItem = document.createElement('div');
        reflectionItem.className = 'reflection-item';
        reflectionItem.textContent = `Reflection ${index + 1}: ${reflection}`;
        reflectionList.appendChild(reflectionItem);
      });
    } else {
      // No reflections found
      const noReflections = document.createElement('div');
      noReflections.className = 'reflection-item';
      noReflections.textContent = 'No reflections found for this session.';
      reflectionList.appendChild(noReflections);
    }
  });

  // Add functionality to the Continue button
  continueButton.addEventListener('click', () => {
    // Close the final reflection window
    window.close();
  });
});