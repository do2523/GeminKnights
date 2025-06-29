let timerData = {
  isRunning: false,
  remainingTime: 0,
  intervalId: null,
  sessionName: "",
  reflections: [], // Store reflections for the session
  hasActiveSession: false, // Track if session is active regardless of timer
};

// Add this at the top with your other variables
let completedSessions = [];

// Load session state from storage when the background script starts
chrome.storage.local.get(["timerData"], (result) => {
  if (result.timerData) {
    timerData = result.timerData;
    if (timerData.isRunning) {
      startTimer(timerData.remainingTime); // Resume the timer if it was running
    }
  }
});

// Load completed sessions from storage when the background script starts
chrome.storage.local.get(["completedSessions"], (result) => {
  if (result.completedSessions) {
    completedSessions = result.completedSessions;
  }
});

// Save session state to storage
function saveSessionState() {
  chrome.storage.local.set({ timerData });
}

// Add this function to save completed sessions
function saveCompletedSessions() {
  chrome.storage.local.set({ completedSessions });
}

// Listen for messages from the popup
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.type === "initializeSession") {
    timerData.sessionName = message.sessionName;
    timerData.reflections = []; // Reset reflections for the new session
    timerData.hasActiveSession = true; // Mark session as active
    saveSessionState();
    sendResponse({ status: `Session "${message.sessionName}" initialized` });
  } else if (message.type === "startTimer") {
    startTimer(message.duration);
    saveSessionState();
    sendResponse({ status: "Timer started" });
  } else if (message.type === "pauseTimer") {
    pauseTimer();
    saveSessionState();
    sendResponse({ status: "Timer paused" });
  } else if (message.type === "resetTimer") {
    resetTimer(message.duration);
    saveSessionState();
    sendResponse({ status: "Timer reset" });
  } else if (message.type === "stopSession") {
    stopSession();
    saveSessionState();
    sendResponse({ status: "Session stopped" });
  } else if (message.type === "getTimerStatus") {
    sendResponse(timerData);
  } else if (message.type === "checkSessionState") {
    sendResponse({
      isRunning: timerData.isRunning,
      hasActiveSession: timerData.hasActiveSession,
    });
  } else if (message.type === "saveReflection") {
    timerData.reflections.push(message.reflection); // Save the reflection
    saveSessionState();
    sendResponse({ status: "Reflection saved" });
  } else if (message.type === "getCompletedSessions") {
    sendResponse({ completedSessions });
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
      // Session is still active even when timer ends
      timerData.hasActiveSession = true;

      // Notify the user and open the reflection page
      chrome.notifications.create({
        type: "basic",
        iconUrl: "resources/icon128.png",
        title: "FocusForge",
        message: `Session "${timerData.sessionName}" completed!`,
      });

      // Open the Reflect.html page in a new window
      chrome.windows.create({
        url: "pages/reflect/Reflect.html",
        type: "popup",
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

  // Save the current session data before clearing it
  if (timerData.sessionName && timerData.reflections.length > 0) {
    // Create a completed session object
    const completedSession = {
      sessionName: timerData.sessionName,
      reflections: timerData.reflections,
      timestamp: new Date().toISOString(),
    };

    // Add to completed sessions array
    completedSessions.push(completedSession);
    saveCompletedSessions();

    // Optional: Log to console so you can verify data is saved
    console.log("Session saved:", completedSession);
  }

  // Reset timer data
  timerData = {
    isRunning: false,
    remainingTime: 0,
    intervalId: null,
    sessionName: "",
    reflections: [],
    hasActiveSession: false,
  };

  chrome.storage.local.remove("timerData");
}
