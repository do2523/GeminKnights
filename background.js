let timer = null;
let log = [];

function askUserForInput() {
  const response = prompt("What did you do in the last 15 minutes?");
  const time = new Date().toLocaleTimeString();
  log.push({ time, text: response || "No response" });

  chrome.storage.local.set({ activityLog: log });
}

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.action === "startSession") {
    log = []; // clear old session
    askUserForInput();
    timer = setInterval(askUserForInput, 5 * 1000); //5 sec for testing
  } else if (message.action === "stopSession") {
    clearInterval(timer);
  }
});
