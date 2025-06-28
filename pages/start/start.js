document.addEventListener('DOMContentLoaded', () => {
  const startSessionButton = document.getElementById('start-session-button');
  const sessionNameInput = document.getElementById('session-name');

  startSessionButton.addEventListener('click', () => {
    const sessionName = sessionNameInput.value.trim();
    if (sessionName) {
      alert(`Starting session: ${sessionName}`);
      // Redirect or initialize session logic here
    } else {
      alert('Please enter a session name.');
    }
  });
});