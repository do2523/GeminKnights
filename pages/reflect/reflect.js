document.addEventListener('DOMContentLoaded', () => {
  const submitButton = document.getElementById('submit-button');
  const reflectInput = document.getElementById('reflect-input');

  // Add functionality for the Submit button
  submitButton.addEventListener('click', () => {
    const reflectionText = reflectInput.value.trim();
    if (reflectionText) {
      alert(`Reflection submitted: ${reflectionText}`);
      reflectInput.value = ''; // Clear the input after submission
    } else {
      alert('Please enter your reflection before submitting.');
    }
  });
});