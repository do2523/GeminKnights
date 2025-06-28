document.addEventListener('DOMContentLoaded', () => {
  const startSessionButton = document.getElementById('start-session-button');
  const sessionNameInput = document.getElementById('session-name');

  // Check session state when the extension is opened
  chrome.runtime.sendMessage({ type: 'checkSessionState' }, (response) => {
    // Redirect if there's an active session, even if timer isn't running
    if (response && response.hasActiveSession) {
      // Redirect to ongoing.html if a session is active
      window.location.href = '../ongoing/ongoing.html';
    }
  });

  startSessionButton.addEventListener('click', () => {
    const sessionName = sessionNameInput.value.trim();
    if (sessionName) {
      // Send a message to the background script to initialize the session
      chrome.runtime.sendMessage({ type: 'initializeSession', sessionName }, (response) => {
        console.log(response.status);
        // Redirect to ongoing.html
        window.location.href = '../ongoing/ongoing.html';
      });
    } else {
      alert('Please enter a session name.');
    }
  });
});