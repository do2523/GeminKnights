// let timer = null;
// let log = [];

// function askUserForInput() {
//   const response = prompt("What did you do in the last 15 minutes?");
//   const time = new Date().toLocaleTimeString();
//   log.push({ time, text: response || "No response" });

//   chrome.storage.local.set({ activityLog: log });
// }

// chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
//   if (message.action === "startSession") {
//     log = []; 
//     askUserForInput();
//     timer = setInterval(askUserForInput, 5 * 1000); 
//   } else if (message.action === "stopSession") {
//     clearInterval(timer);
//   }
// });

chrome.runtime.onInstalled.addListener(() => {
  console.log("Background loaded");
});

