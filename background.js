let timerData = {
  isRunning: false,
  remainingTime: 0,
  intervalId: null,
  sessionName: '',
};

// Load session state from storage when the background script starts
chrome.storage.local.get(['timerData'], (result) => {
  if (result.timerData) {
    timerData = result.timerData;
    if (timerData.isRunning) {
      startTimer(timerData.remainingTime); // Resume the timer if it was running
    }
  }
});

// Save session state to storage
function saveSessionState() {
  chrome.storage.local.set({ timerData });
}

// Listen for messages from the popup
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.type === 'initializeSession') {
    timerData.sessionName = message.sessionName;
    saveSessionState();
    sendResponse({ status: `Session "${message.sessionName}" initialized` });
  } else if (message.type === 'startTimer') {
    startTimer(message.duration);
    saveSessionState();
    sendResponse({ status: 'Timer started' });
  } else if (message.type === 'pauseTimer') {
    pauseTimer();
    saveSessionState();
    sendResponse({ status: 'Timer paused' });
  } else if (message.type === 'resetTimer') {
    resetTimer(message.duration);
    saveSessionState();
    sendResponse({ status: 'Timer reset' });
  } else if (message.type === 'stopSession') {
    stopSession();
    saveSessionState();
    sendResponse({ status: 'Session stopped' });
  } else if (message.type === 'getTimerStatus') {
    sendResponse(timerData);
  } else if (message.type === 'checkSessionState') {
    sendResponse({ isRunning: timerData.isRunning });
  }
});

// Start the timer
function startTimer(duration) {
  if (timerData.isRunning) return;

  timerData.isRunning = true;
  timerData.remainingTime = duration;
  timerData.intervalId = setInterval(() => {
    timerData.remainingTime--;
    saveSessionState(); // Save the remaining time periodically
    if (timerData.remainingTime <= 0) {
      clearInterval(timerData.intervalId);
      timerData.isRunning = false;

      // Notify the user and open the reflection page
      chrome.notifications.create({
        type: 'basic',
        iconUrl: 'resources/icon128.png',
        title: 'FocusForge',
        message: `Session "${timerData.sessionName}" completed!`,
      });

      // Open the Reflect.html page in a new window
      chrome.windows.create({
        url: 'pages/reflect/Reflect.html',
        type: 'popup',
        width: 400,
        height: 600,
      });

      saveSessionState();
    }
  }, 1000);
}

// Pause the timer
function pauseTimer() {
  if (!timerData.isRunning) return;

  clearInterval(timerData.intervalId);
  timerData.isRunning = false;
}

// Reset the timer
function resetTimer(duration) {
  clearInterval(timerData.intervalId);
  timerData.isRunning = false;
  timerData.remainingTime = duration;
}

// Stop the session
function stopSession() {
  clearInterval(timerData.intervalId);
  timerData = {
    isRunning: false,
    remainingTime: 0,
    intervalId: null,
    sessionName: '',
  };
  chrome.storage.local.remove('timerData'); // Clear session data from storage
}