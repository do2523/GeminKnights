document.addEventListener('DOMContentLoaded', () => {
  const submitButton = document.getElementById('submit-button');
  const reflectInput = document.getElementById('reflect-input');

  // Add functionality for the Submit button
  submitButton.addEventListener('click', () => {
    const reflectionText = reflectInput.value.trim();
    if (reflectionText) {
      // Save the reflection to the session
      chrome.runtime.sendMessage({ type: 'saveReflection', reflection: reflectionText }, (response) => {
        if (response && response.status === 'Reflection saved') {
          // Get all reflections for the current session
          chrome.runtime.sendMessage({ type: 'getTimerStatus' }, (timerResponse) => {
            if (timerResponse && timerResponse.reflections) {
              // Format all reflections for display
              const allReflections = timerResponse.reflections.map(
                (reflection, index) => `Reflection ${index + 1}: ${reflection}`
              ).join('\n\n');
              
              // Show all reflections in the alert
              alert(`Reflection saved successfully!\n\nAll reflections in this session:\n${allReflections}`);
              
              // Close the reflection popup window and return to ongoing.html
              chrome.windows.getCurrent((currentWindow) => {
                chrome.windows.remove(currentWindow.id, () => {
                  // If there's any error handling needed, it would go here
                });
              });
            }
          });
        } else {
          alert('Failed to save reflection.');
        }
      });
    } else {
      alert('Please enter your reflection before submitting.');
    }
  });
});